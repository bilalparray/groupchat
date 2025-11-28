import { LoginUserSM } from './login/login-user-s-m';
import { GenderSM } from '../../enums/gender-s-m.enum';
import { RoleTypeSM } from '../../enums/role-type-s-m.enum';

export class ClientUserSM {
  username!: string;
  email!: string;
  password!: string;
  role!: string;
}
