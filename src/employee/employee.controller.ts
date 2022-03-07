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
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';
import { Roles } from 'src/common/decarators/roles.decorator';
import { RolesUser } from 'src/common/enums/roles.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransformInterceptor } from 'src/utils/helpers/transformInterceptor';

@Controller('employee')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  async findAll(@Query() query): Promise<object> {
    const employees = this.employeeService.findAll(query);
    return employees;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const employee: Promise<object> = this.employeeService.findOne(id);
    if (employee) return employee;
  }

  @Post()
  @Roles(RolesUser.ADMIN)
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    const newEmployee = this.employeeService.create(createEmployeeDto);
    return newEmployee;
  }

  @Patch(':id')
  @Roles(RolesUser.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ): Promise<object> {
    const employee: Promise<object> = this.employeeService.update(
      id,
      updateEmployeeDto
    );
    if (employee) return employee;
  }

  @Delete(':id')
  @Roles(RolesUser.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<object> {
    const employee = this.employeeService.delete(id);
    return employee;
  }
}
