import { RolesUser } from 'src/common/enums/roles.enum';

export interface TokenPayload {
  id: number;
  email: string;
  roles: RolesUser;
}
