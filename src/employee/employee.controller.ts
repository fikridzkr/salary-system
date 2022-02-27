import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './interfaces/employee.interface';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async findAll(): Promise<Employee[]> {
    const employees: Employee[] = this.employeeService.findAll();

    if (employees.length === 0)
      throw new HttpException('Data Employee Not Found', HttpStatus.NOT_FOUND);
    if (employees) return employees;
    else throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Employee> {
    const employee: Employee = this.employeeService.findOne(id);
    if (employee) return employee;
    else
      throw new HttpException(
        `Employee Id ${id} Not Found`,
        HttpStatus.NOT_FOUND,
      );
  }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    this.employeeService.create(createEmployeeDto);
    return createEmployeeDto;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee[]> {
    const employees: Employee[] = this.employeeService.update(
      id,
      updateEmployeeDto,
    );
    if (employees) return employees;
    else throw new HttpException(`Bad Request`, HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Employee[]> {
    const employee: Employee[] = this.employeeService.remove(id);
    if (employee) return employee;
    else
      throw new HttpException(
        `Employee Id ${id} Not Found`,
        HttpStatus.NOT_FOUND,
      );
  }
}
