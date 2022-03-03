import { RolesUser } from 'src/common/enums/roles.enum';
import Employee from 'src/employee/employee.entity';
export class UpdateUserDto {
  email: string;
  password: string;
  employeeId: number;
  employee: Employee;
  roles: RolesUser;
}
