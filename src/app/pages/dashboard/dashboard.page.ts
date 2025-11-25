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
} from '@ionic/angular/standalone';
import { BaseComponent } from 'src/app/components/base.component';
import { CommonService } from 'src/app/services/common.service';
import { LogHandlerService } from 'src/app/services/log-handler.service';
import { StorageService } from 'src/app/services/storage.service';
import { DashboardViewModel } from 'src/app/models/view/end-user/dashboard.viewmodel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonMenuButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class DashboardPage
  extends BaseComponent<DashboardViewModel>
  implements OnInit
{
  constructor(
    commonService: CommonService,
    loghandler: LogHandlerService,
    private storageService: StorageService
  ) {
    super(commonService, loghandler);
    this.viewModel = new DashboardViewModel();
  }

  ngOnInit() {}
}
