import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';
import { Roles } from 'src/common/decarators/roles.decorator';
import { RolesUser } from 'src/common/enums/roles.enum';
import Employee from './employee.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('employee')
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async findAll(@Query() query): Promise<object> {
    const employees = this.employeeService.findAll(query);
    return employees;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
    const employee: Promise<Employee> = this.employeeService.findOne(id);
    if (employee) return employee;
  }

  @Post()
  @Roles(RolesUser.ADMIN)
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    this.employeeService.create(createEmployeeDto);
    return createEmployeeDto;
  }

  @Patch(':id')
  @Roles(RolesUser.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ): Promise<Employee> {
    const employee: Promise<Employee> = this.employeeService.update(
      id,
      updateEmployeeDto
    );
    if (employee) return employee;
  }

  @Delete(':id')
  @Roles(RolesUser.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Employee[]> {
    const employee = this.employeeService.delete(id);
    return employee;
  }
}
