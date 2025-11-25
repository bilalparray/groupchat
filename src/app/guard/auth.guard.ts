import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppConstants } from 'src/app/app-constants';
import { StorageService } from '../services/storage.service';
import { AccountService } from '../services/account.service';
import { CommonService } from '../services/common.service';
import { jwtDecode } from 'jwt-decode';
import { RoleTypeSM } from '../models/service/app/enums/role-type-s-m.enum';
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private storageService: StorageService,
    private accountService: AccountService,
    public router: Router,
    private commonService: CommonService
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (!(await this.IsTokenValid())) {
      await this.router.navigate([AppConstants.WEB_ROUTES.ENDUSER.LOGIN]);
      await this.accountService.logoutUser();
      return false;
    }
    const expectedRole = route.data['allowedRole'];
    debugger;
    let isValidRole = false;
    for (let index = 0; index < expectedRole.length; index++) {
      if (!isValidRole)
        isValidRole = await this.IsRoleValidForRoute(expectedRole[index]);
    }
    if (isValidRole) {
      return true;
    } else {
      this.router.navigate([AppConstants.WEB_ROUTES.ENDUSER.LOGIN]);
      return false;
    }
  }

  async canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const token: string = await this.storageService.getFromStorage(
      AppConstants.DATABASE_KEYS.ACCESS_TOKEN
    );
    return !jwtHelper.isTokenExpired(token);
  }

  async IsTokenValid(): Promise<boolean> {
    const token: string = await this.storageService.getFromStorage(
      AppConstants.DATABASE_KEYS.ACCESS_TOKEN
    );

    return (
      token != undefined &&
      token != null &&
      token != '' &&
      !jwtHelper.isTokenExpired(token)
    );
  }

  async IsRoleValidForRoute(expectedRole: any): Promise<boolean> {
    let tokenRole = await this.GetRoleFromToken();
    if (tokenRole === expectedRole) return true;
    return false;
  }

  async GetRoleFromToken(): Promise<any> {
    const token: string = await this.storageService.getFromStorage(
      AppConstants.DATABASE_KEYS.ACCESS_TOKEN
    );

    const tokenPayload: any = jwtDecode(token);
    let role: any = RoleTypeSM[tokenPayload[AppConstants.TOKEN_KEY_NAMES.Role]];
    this.commonService.layoutViewModel.loggedInUserType = role;
    return role;
  }
}
