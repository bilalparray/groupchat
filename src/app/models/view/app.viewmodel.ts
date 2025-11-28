import { BaseViewModel } from '../internal/base.viewmodel';
import { AppConstants } from 'src/app/app-constants';
import { signal } from '@angular/core';

export class AppViewModel extends BaseViewModel {
  isUserLoggedIn = signal(false);
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
  ];
}
