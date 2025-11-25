import { environment } from 'src/environments/environment';
import { BaseViewModel } from '../internal/base.viewmodel';
import { AppInformationSM } from '../service/app/v1/client/app-information-s-m';
import { AppConstants } from 'src/app/app-constants';

export class AppViewModel extends BaseViewModel {
  isUserLoggedIn: boolean = false;
  userNotLoggedInPages = [
    { title: 'Login', url: '/login', icon: 'lock-closed-outline' },
    { title: 'Register', url: '/register', icon: 'enter-outline' },
    { title: 'Guest', url: '/guest', icon: 'person-outline' },
  ];

  userLoggedInPages = [
    {
      title: 'Dashboard',
      url: AppConstants.WEB_ROUTES.ENDUSER.DASHBOARD,
      icon: 'home-outline',
    },
    { title: 'About', url: '/about', icon: 'information-circle-outline' },
  ];
}
