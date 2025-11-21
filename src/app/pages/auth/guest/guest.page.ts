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
export class GuestPage {
  model = {
    name: '',
    inviteKey: '',
  };

  touched: { [key: string]: boolean } = {
    name: false,
    inviteKey: false,
  };

  constructor(private router: Router) {}

  onBlur(field: 'name' | 'inviteKey') {
    this.touched[field] = true;
  }

  showError(field: 'name' | 'inviteKey'): boolean {
    if (!this.touched[field]) return false;
    if (field === 'name') {
      return !this.model.name || this.model.name.trim() === '';
    }
    if (field === 'inviteKey') {
      return !this.model.inviteKey || this.model.inviteKey.trim() === '';
    }
    return false;
  }

  isFormValid(): boolean {
    return (
      !!this.model.name &&
      this.model.name.trim() !== '' &&
      !!this.model.inviteKey &&
      this.model.inviteKey.trim() !== ''
    );
  }

  submit(form: any) {
    // mark touched so errors show if invalid
    // mark touched so errors show if invalid
    this.touched['name'] = true;
    this.touched['inviteKey'] = true;

    if (!this.isFormValid()) return;

    // Replace with actual guest-join logic (API call / local flow)
    console.log('Guest join payload:', {
      name: this.model.name,
      inviteKey: this.model.inviteKey,
    });

    // Example navigation after successful guest join:
    // this.router.navigate(['/home']);
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
