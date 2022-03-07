import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEmployeeDto {
  @ApiPropertyOptional()
  employeeId: number;
  @ApiPropertyOptional()
  name: string;
  @ApiPropertyOptional()
  age: number;
  @ApiPropertyOptional()
  phoneNumber: number;
  @ApiPropertyOptional()
  position: string;
  @ApiPropertyOptional()
  address: string;
  @ApiPropertyOptional()
  basicSalary: number;
  @ApiPropertyOptional()
  salaryAllowance: number;
  @ApiPropertyOptional()
  totalSalary: number;
}
