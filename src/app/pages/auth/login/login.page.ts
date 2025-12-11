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
import { StorageService } from 'src/app/services/storage.service';
import { AppConstants } from 'src/app/app-constants';
import { BaseComponent } from 'src/app/components/base.component';
import { LoginViewModel } from 'src/app/models/view/end-user/login.viewmodel';
import { CommonService } from 'src/app/services/common.service';
import { LogHandlerService } from 'src/app/services/log-handler.service';
import { AccountService } from 'src/app/services/account.service';
import { TokenRequestSM } from 'src/app/models/service/app/token/token-request-s-m';
import { RoleTypeSM } from 'src/app/models/service/app/enums/role-type-s-m.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
export class LoginPage extends BaseComponent<LoginViewModel> {
  touched: { [key: string]: boolean } = {
    email: false,
    password: false,
  };

  constructor(
    commonService: CommonService,
    loghandler: LogHandlerService,
    private storageService: StorageService,
    private router: Router,
    private accountService: AccountService
  ) {
    super(commonService, loghandler);
    this.viewModel = new LoginViewModel();
  }

  onBlur(field: 'email' | 'password') {
    this.touched[field] = true;
  }

  isValidEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9_]{3,20}$/;
    return re.test(email);
  }

  showError(field: 'email' | 'password'): boolean {
    if (!this.touched[field]) return false;
    if (field === 'email') {
      return !this.viewModel.email || !this.isValidEmail(this.viewModel.email);
    }
    if (field === 'password') {
      return !this.viewModel.password || this.viewModel.password.length < 6;
    }
    return false;
  }

  isFormValid(): boolean {
    return (
      !!this.viewModel.email &&
      // this.isValidEmail(this.viewModel.email) &&
      !!this.viewModel.password &&
      this.viewModel.password.length >= 6
    );
  }

  async submit() {
    this.touched['email'] = true;
    this.touched['password'] = true;
    if (!this.isFormValid()) return;

    const payload: TokenRequestSM = {
      username: this.viewModel.email,
      password: this.viewModel.password,
    };

    const loader = await this._commonService.presentIonicLoader(
      'Authenticating...'
    );

    try {
      const resp = await this.accountService.generateToken(payload);

      if (resp?.successData) {
        this.navigate(AppConstants.WEB_ROUTES.ENDUSER.DASHBOARD);
      }
    } catch (err: any) {
      await this._commonService.presentIonicToast(
        'bottom',
        err?.displayMessage || err?.message || 'Error occurred',
        3000
      );
    } finally {
      await loader?.dismiss();
    }
  }

  async navigate(path: string) {
    this.router.navigate([path]);
  }
}
