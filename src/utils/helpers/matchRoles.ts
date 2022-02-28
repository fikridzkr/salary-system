import { RolesUser } from 'src/common/enums/roles.enum';
export function matchRoles(roles: string[], currentRole: RolesUser) {
  for (const role of roles) {
    if (role == currentRole) return true;
    else return false;
  }
}
