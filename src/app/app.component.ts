import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { enterOutline, lockClosedOutline, personOutline } from 'ionicons/icons';
import { environment } from 'src/environments/environment';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
import { StorageService } from './services/storage.service';
import { AppConstants } from './app-constants';
import { BaseComponent } from './components/base.component';
import { AppViewModel } from './models/view/app.viewmodel';
import { CommonService } from './services/common.service';
import { LogHandlerService } from './services/log-handler.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
  ],
})
export class AppComponent extends BaseComponent<AppViewModel> {
  environment = environment;

  constructor(
    commonService: CommonService,
    loghandler: LogHandlerService,
    private storageService: StorageService
  ) {
    super(commonService, loghandler);
    this.viewModel = new AppViewModel();
    addIcons({
      lockClosedOutline,
      personOutline,
      enterOutline,
    });
  }

  async ngOnInit() {
    let accessToken = await this.storageService.getFromStorage(
      AppConstants.DATABASE_KEYS.ACCESS_TOKEN
    );
    if (accessToken != null && accessToken != '') {
      this.viewModel.isUserLoggedIn = true;
    } else {
      this.viewModel.isUserLoggedIn = false;
    }
    await EdgeToEdge.enable();
  }
}
