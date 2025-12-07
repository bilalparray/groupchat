import { SampleServiceServiceModelBase } from '../../base/sample-service-service-model-base';

export class GuestLoginResponse extends SampleServiceServiceModelBase<number> {
  name!: string;
  role!: 'Guest';
  guestKey!: string;
  department!: string;
  accessToken!: string;
  refreshToken!: string;
}
