import { IsNotEmpty } from 'class-validator';
import { RolesUser } from 'src/common/enums/roles.enum';
import Employee from 'src/employee/employee.entity';
export class CreateUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  employeeId: number;

  employee: Employee;

  @IsNotEmpty()
  roles: RolesUser;
}
