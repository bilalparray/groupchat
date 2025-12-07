import { SampleServiceServiceModelBase } from '../../base/sample-service-service-model-base';

export class GuestLoginRequest extends SampleServiceServiceModelBase<number> {
  guestKey!: string;
  guestName!: string;
  role!: string;
}
