import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { RoleTypeSM } from './models/service/app/enums/role-type-s-m.enum';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'guest',
    loadComponent: () =>
      import('./pages/auth/guest/guest.page').then((m) => m.GuestPage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
    canActivate: [AuthGuard],
    data: { allowedRole: [RoleTypeSM.Admin] },
  },
  {
    path: 'keys',
    loadComponent: () =>
      import('./pages/keys/keys.page').then((m) => m.KeysPage),
    canActivate: [AuthGuard],
    data: { allowedRole: [RoleTypeSM.Admin] },
  },
];
