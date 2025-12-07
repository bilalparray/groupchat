import { BaseViewModel } from '../../internal/base.viewmodel';
import { GuestLoginRequest } from '../../service/app/v1/general/guest-login-request-sm';

export class GuestViewModel extends BaseViewModel {
  guestLoginRequest: GuestLoginRequest = new GuestLoginRequest();
}
