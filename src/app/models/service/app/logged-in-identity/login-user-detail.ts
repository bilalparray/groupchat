import { RoleTypeSM } from '../enums/role-type-s-m.enum';

export class LoginUserDetail {
  dbRecordId!: number;
  loginId!: string;
  userType!: RoleTypeSM;
}
