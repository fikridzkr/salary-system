import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @ApiProperty()
  employeeId: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  age: number;

  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: number;

  @IsNotEmpty()
  @ApiProperty()
  position: string;

  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @ApiProperty()
  basicSalary: number;

  @IsNotEmpty()
  @ApiProperty()
  salaryAllowance: number;

  @IsNotEmpty()
  @ApiProperty()
  totalSalary: number;
}
