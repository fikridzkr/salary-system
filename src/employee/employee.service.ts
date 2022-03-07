import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Employee from './employee.entity';
import { Like, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  async create(employee: CreateEmployeeDto) {
    const newEmployee = await this.employeeRepository.create(employee);
    await this.employeeRepository.save(newEmployee);
    return {
      data: newEmployee,
      message: 'Employee success created.'
    };
  }

  async update(id: number, employee: UpdateEmployeeDto) {
    await this.employeeRepository.update(id, employee);
    const updatedEmployee = await this.employeeRepository.findOne(id);
    if (updatedEmployee) {
      return {
        data: updatedEmployee,
        message: 'Employee success edited.'
      };
    }
    throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
  }

  async findAll(query): Promise<object> {
    const limit = query.limit || 10;
    const page = query.page || 1;
    const offset = (page - 1) * limit;
    const keyword = query.keyword || '';
    const [result, total] = await this.employeeRepository.findAndCount({
      where: { name: Like('%' + keyword + '%') },
      order: { name: 'DESC' },
      take: limit,
      skip: offset
    });
    return {
      data: result,
      count: total,
      message: 'Show data Employees.'
    };
  }

  async findOne(id: number): Promise<object> {
    const result = await this.employeeRepository.findOne(id);
    if (result) {
      return {
        data: result,
        message: 'Show data employee.'
      };
    }
    throw new HttpException('Employee not found.', HttpStatus.NOT_FOUND);
  }

  async delete(id: number): Promise<object> {
    const deleteResponse = await this.employeeRepository.softDelete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return {
      data: deleteResponse,
      message: 'Delete employees success.'
    };
  }
}
