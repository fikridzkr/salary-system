import { IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  employeeId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  basicSalary: number;

  @IsNotEmpty()
  salaryAllowance: number;

  @IsNotEmpty()
  totalSalary: number;
}
