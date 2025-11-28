import { RoleTypeSM } from '../../enums/role-type-s-m.enum';

export class ClientUserSM {
  username!: string;
  email!: string;
  password!: string;
  role!: RoleTypeSM;
}
