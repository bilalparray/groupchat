import { AfterViewInit, Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { BaseComponent } from 'src/app/components/base.component';
import { CommonService } from 'src/app/services/common.service';
import { LogHandlerService } from 'src/app/services/log-handler.service';
import { StorageService } from 'src/app/services/storage.service';
import { DashboardViewModel } from 'src/app/models/view/end-user/dashboard.viewmodel';
import { addIcons } from 'ionicons';
import { lockClosed, logOutOutline } from 'ionicons/icons';
import { AccountService } from 'src/app/services/account.service';
import { AppConstants } from 'src/app/app-constants';
import { ClientUserSM } from 'src/app/models/service/app/v1/app-users/client-user-s-m';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
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
    private accountService: AccountService
  ) {
    super(commonService, loghandler);
    this.viewModel = new DashboardViewModel();
    addIcons({ logOutOutline, lockClosed });
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
}
