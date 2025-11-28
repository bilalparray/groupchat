import { BaseViewModel } from '../../internal/base.viewmodel';
import { ClientUserSM } from '../../service/app/v1/app-users/client-user-s-m';

export class DashboardViewModel extends BaseViewModel {
  user: string = '';
}
