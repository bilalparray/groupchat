import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonCard,
  IonBadge,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  AlertController,
} from '@ionic/angular/standalone';
import { BaseComponent } from 'src/app/components/base.component';
import { CommonService } from 'src/app/services/common.service';
import { LogHandlerService } from 'src/app/services/log-handler.service';
import { StorageService } from 'src/app/services/storage.service';
import { DashboardViewModel } from 'src/app/models/view/end-user/dashboard.viewmodel';
import { addIcons } from 'ionicons';
import {
  lockClosed,
  logOutOutline,
  key,
  searchOutline,
  keyOutline,
  createOutline,
  trashOutline,
} from 'ionicons/icons';
import { AccountService } from 'src/app/services/account.service';
import { AppConstants } from 'src/app/app-constants';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonBadge,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonIcon,
    IonCard,
  ],
})
export class DashboardPage
  extends BaseComponent<DashboardViewModel>
  implements OnInit
{
  constructor(
    commonService: CommonService,
    loghandler: LogHandlerService,
    private storageService: StorageService,
    private accountService: AccountService,
    private dashboardService: DashboardService,
    private alertController: AlertController
  ) {
    super(commonService, loghandler);
    this.viewModel = new DashboardViewModel();
    addIcons({
      key,
      logOutOutline,
      createOutline,
      trashOutline,
      searchOutline,
      lockClosed,
      keyOutline,
    });
  }

  async ngOnInit() {
    let user: any = await this.storageService.getFromStorage(
      AppConstants.DATABASE_KEYS.USER
    );
    this.viewModel.user = user.username;
  }

  async logout() {
    const loader = await this._commonService.presentIonicLoader(
      'Logging out...'
    );
    await this.accountService.logoutUser();
    loader.dismiss();
  }

  async generateKey() {
    const loader = await this._commonService.presentIonicLoader(
      'Generating Key...'
    );

    try {
      const resp = await this.dashboardService.GenerateGuestKey(
        this.viewModel.guestKeyRequest
      );

      if (resp?.successData) {
        this._commonService.presentIonicToast(
          'middle',
          'Key Generated Successfully',
          3000
        );
        this.storageService.saveToStorage(
          AppConstants.DATABASE_KEYS.GUEST_KEY,
          resp.successData
        );
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

  deleteKey() {
    throw new Error('Method not implemented.');
  }
  editKey(_t56: any) {
    throw new Error('Method not implemented.');
  }

  async presentAlertWithInput() {
    const alert = await this.alertController.create({
      header: 'Enter Department Name',
      inputs: [
        {
          name: 'userValue',
          type: 'text',
          placeholder: 'Type Department...',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (data) => {
            if (data.userValue == '') {
              return false;
            }
            this.viewModel.guestKeyRequest.department = data.userValue;
            this.generateKey();
            return true;
          },
        },
      ],
    });

    await alert.present();
  }
}
