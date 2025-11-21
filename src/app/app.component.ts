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
export class AppComponent {
  environment = environment;
  public appPages = [
    { title: 'Login', url: '/login', icon: 'lock-closed-outline' },
    { title: 'Register', url: '/register', icon: 'enter-outline' },
    { title: 'Guest', url: '/guest', icon: 'person-outline' },
  ];
  constructor() {
    addIcons({
      lockClosedOutline,
      personOutline,
      enterOutline,
    });
  }

  async ngOnInit() {
    await EdgeToEdge.enable();
  }
}
