import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Employee from './employee.entity';
import { Repository } from 'typeorm';
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
    return newEmployee;
  }

  async update(id: number, employee: UpdateEmployeeDto) {
    await this.employeeRepository.update(id, employee);
    const updatedEmployee = await this.employeeRepository.findOne(id);
    if (updatedEmployee) {
      return updatedEmployee;
    }
    throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
  }

  async findAll(): Promise<Employee[]> {
    const employees = await this.employeeRepository.find();
    if (employees) {
      return employees;
    }
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne(id);
    if (employee) {
      return employee;
    }
    throw new HttpException('Employee not found.', HttpStatus.NOT_FOUND);
  }

  async delete(id: number): Promise<Employee[]> {
    const deleteResponse = await this.employeeRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return this.employeeRepository.find();
  }
}
