import { Injectable } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './interfaces/employee.interface';

@Injectable()
export class EmployeeService {
  private employees: Employee[] = [];

  create(employee: Employee) {
    this.employees.push(employee);
  }

  update(id: number, employee: UpdateEmployeeDto) {
    this.employees = this.employees.map((item) =>
      item.id === Number(id) ? { id, ...employee } : item,
    );
    return this.employees;
  }

  findAll(): Employee[] {
    return this.employees;
  }

  findOne(id: number): Employee {
    return this.employees.filter((item) => item.id === Number(id))[0];
  }

  remove(id: number): Employee[] {
    this.employees = this.employees.filter((item) => item.id !== Number(id));
    return this.employees;
  }
}
