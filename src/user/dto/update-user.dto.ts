import { RolesUser } from 'src/common/enums/roles.enum';
import Employee from 'src/employee/employee.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateUserDto {
  @ApiPropertyOptional()
  email: string;
  @ApiPropertyOptional()
  password: string;
  @ApiPropertyOptional()
  employeeId: number;
  @ApiPropertyOptional()
  employee: Employee;
  @ApiPropertyOptional({ enum: RolesUser })
  roles: RolesUser;
}
