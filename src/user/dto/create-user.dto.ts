import { IsNotEmpty } from 'class-validator';
import { RolesUser } from 'src/common/enums/roles.enum';
import Employee from 'src/employee/employee.entity';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @ApiProperty({ enum: RolesUser })
  roles: RolesUser;
  @ApiPropertyOptional()
  employeeId: number;
  @ApiPropertyOptional()
  employee: Employee;
}
