import { BaseViewModel } from '../../internal/base.viewmodel';
import { ClientUserSM } from '../../service/app/v1/app-users/client-user-s-m';
import { GenerateGuestKeyRequest } from '../../service/app/v1/generate-guest-key-request-sm';

export class DashboardViewModel extends BaseViewModel {
  user: string = '';
  guestKeyRequest: GenerateGuestKeyRequest = new GenerateGuestKeyRequest();

  keys: any[] = [
    {
      id: '1',
      name: 'Main Door',
      key: 'A1B2-C3D4-E5F6',
      status: 'active',
      totalGuests: 15,
      activeCount: 12,
      inactiveCount: 3,
    },
    {
      id: '2',
      name: 'Back Gate',
      key: 'Z9Y8-X7W6-V5U4',
      status: 'inactive',
      totalGuests: 8,
      activeCount: 2,
      inactiveCount: 6,
    },
    {
      id: '3',
      name: 'Guest Room',
      key: 'G1H2-I3J4-K5L6',
      status: 'pending',
      totalGuests: 4,
      activeCount: 1,
      inactiveCount: 3,
    },
    {
      id: '4',
      name: 'Side Entrance',
      key: 'S1E2-N3T4-R5Y6',
      status: 'active',
      totalGuests: 10,
      activeCount: 7,
      inactiveCount: 3,
    },
  ];
}
