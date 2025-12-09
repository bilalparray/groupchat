import { SampleServiceServiceModelBase } from '../base/sample-service-service-model-base';

export class GuestKeyResponse extends SampleServiceServiceModelBase<number> {
  key!: string;
  department!: string;
  status!: 'Enabled' | 'Disabled';
  totalGuestsRegistered!: number;
  activeGuestsCount!: number;
}
