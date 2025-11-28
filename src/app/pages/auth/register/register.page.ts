import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { RegisterViewModel } from 'src/app/models/view/end-user/register.viewmodel';
import { BaseComponent } from 'src/app/components/base.component';
import { AccountService } from 'src/app/services/account.service';
import { CommonService } from 'src/app/services/common.service';
import { LogHandlerService } from 'src/app/services/log-handler.service';
import { StorageService } from 'src/app/services/storage.service';
import { AppConstants } from 'src/app/app-constants';
import { ClientUserSM } from 'src/app/models/service/app/v1/app-users/client-user-s-m';
import { RoleTypeSM } from 'src/app/models/service/app/enums/role-type-s-m.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonButtons,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ],
})
export class RegisterPage extends BaseComponent<RegisterViewModel> {
  touched: { [key: string]: boolean } = {
    email: false,
    password: false,
    confirmPassword: false,
  };

  constructor(
    commonService: CommonService,
    loghandler: LogHandlerService,
    private storageService: StorageService,
    private router: Router,
    private accountService: AccountService
  ) {
    super(commonService, loghandler);
    this.viewModel = new RegisterViewModel();
  }

  onBlur(field: 'email' | 'password' | 'confirmPassword') {
    this.touched[field] = true;
  }

  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  passwordsMatch(): boolean {
    return this.viewModel.password === this.viewModel.confirmPassword;
  }

  showError(field: 'email' | 'password' | 'confirmPassword'): boolean {
    if (!this.touched[field]) return false;

    if (field === 'email') {
      return !this.viewModel.email || !this.isValidEmail(this.viewModel.email);
    }

    if (field === 'password') {
      return !this.viewModel.password || this.viewModel.password.length < 6;
    }

    if (field === 'confirmPassword') {
      // show error when confirm is empty, too short, or does not match password
      if (
        !this.viewModel.confirmPassword ||
        this.viewModel.confirmPassword.length < 6
      )
        return true;
      if (!this.passwordsMatch()) return true;
      return false;
    }

    return false;
  }

  isFormValid(): boolean {
    return (
      !!this.viewModel.email &&
      this.isValidEmail(this.viewModel.email) &&
      !!this.viewModel.password &&
      this.viewModel.password.length >= 6 &&
      !!this.viewModel.confirmPassword &&
      this.viewModel.confirmPassword.length >= 6 &&
      this.passwordsMatch()
    );
  }

  async submit(form: any) {
    this.touched['email'] = true;
    this.touched['password'] = true;
    this.touched['confirmPassword'] = true;
    if (!this.isFormValid()) return;

    const payload: ClientUserSM = {
      username: this.viewModel.email,
      email: this.viewModel.email,
      password: this.viewModel.password,
      role: this._commonService.singleEnumToString(RoleTypeSM, 3),
    };

    const loader = await this._commonService.presentIonicLoader(
      'Authenticating...'
    );

    try {
      const resp = await this.accountService.Register(payload);

      if (resp?.successData) {
        this.navigate(AppConstants.WEB_ROUTES.ENDUSER.DASHBOARD);
      }
    } catch (err: any) {
      await this._commonService.presentIonicToast(
        'bottom',
        err?.displayMessage || err?.message || 'Registration failed',
        3000
      );
    } finally {
      await loader?.dismiss();
    }
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
