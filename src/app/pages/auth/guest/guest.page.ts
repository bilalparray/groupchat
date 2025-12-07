import { Component, model } from '@angular/core';
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
import { GuestViewModel } from 'src/app/models/view/end-user/guest.viewmodel';
import { key, navigate } from 'ionicons/icons';
import { BaseComponent } from 'src/app/components/base.component';
import { AccountService } from 'src/app/services/account.service';
import { CommonService } from 'src/app/services/common.service';
import { LogHandlerService } from 'src/app/services/log-handler.service';
import { StorageService } from 'src/app/services/storage.service';
import { AppConstants } from 'src/app/app-constants';
import { RoleTypeSM } from 'src/app/models/service/app/enums/role-type-s-m.enum';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
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
export class GuestPage extends BaseComponent<GuestViewModel> {
  constructor(
    commonService: CommonService,
    loghandler: LogHandlerService,
    private storageService: StorageService,
    private router: Router,
    private accountService: AccountService
  ) {
    super(commonService, loghandler);
    this.viewModel = new GuestViewModel();
  }

  touched: { [key: string]: boolean } = {
    guestName: false,
    guestKey: false,
  };

  onBlur(field: 'guestName' | 'guestKey') {
    this.touched[field] = true;
  }

  showError(field: 'guestName' | 'guestKey'): boolean {
    if (!this.touched[field]) return false;
    if (field === 'guestName') {
      return (
        !this.viewModel.guestLoginRequest.guestName ||
        this.viewModel.guestLoginRequest.guestName.trim() === ''
      );
    }
    if (field === 'guestKey') {
      return (
        !this.viewModel.guestLoginRequest.guestKey ||
        this.viewModel.guestLoginRequest.guestKey.trim() === ''
      );
    }
    return false;
  }

  isFormValid(): boolean {
    return (
      !!this.viewModel.guestLoginRequest.guestName &&
      this.viewModel.guestLoginRequest.guestName.trim() !== '' &&
      !!this.viewModel.guestLoginRequest.guestKey &&
      this.viewModel.guestLoginRequest.guestKey.trim() !== ''
    );
  }

  async guestSubmit(form: any) {
    // Mark fields as touched
    this.touched['guestName'] = true;
    this.touched['guestKey'] = true;

    if (!this.isFormValid()) return;

    const loader = await this._commonService.presentIonicLoader(
      'Authenticating...'
    );

    try {
      // Keep roles and model as you required
      this.viewModel.guestLoginRequest.role =
        this._commonService.singleEnumToString(RoleTypeSM, 4);

      const resp = await this.accountService.generateGuestToken(
        this.viewModel.guestLoginRequest
      );

      if (resp?.successData) {
        this.navigate(AppConstants.WEB_ROUTES.ENDUSER.DASHBOARD);
        return;
      }

      // Only show error toast when there is an error
      if (resp?.isError) {
        await this._commonService.presentIonicToast(
          'bottom',
          resp?.errorData?.displayMessage || 'Error occurred',
          3000
        );
      }
    } catch (error: any) {
      await this._commonService.presentIonicToast(
        'bottom',
        error?.displayMessage || error?.message || 'Error occurred',
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
