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
export class LoginPage {
  model = {
    email: '',
    password: '',
  };

  touched: { [key: string]: boolean } = {
    email: false,
    password: false,
  };

  constructor(private router: Router, private storageService: StorageService) {}

  onBlur(field: 'email' | 'password') {
    this.touched[field] = true;
  }

  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  showError(field: 'email' | 'password'): boolean {
    if (!this.touched[field]) return false;
    if (field === 'email') {
      return !this.model.email || !this.isValidEmail(this.model.email);
    }
    if (field === 'password') {
      return !this.model.password || this.model.password.length < 6;
    }
    return false;
  }

  isFormValid(): boolean {
    return (
      !!this.model.email &&
      this.isValidEmail(this.model.email) &&
      !!this.model.password &&
      this.model.password.length >= 6
    );
  }

  async submit(form: any) {
    this.touched['email'] = true;
    this.touched['password'] = true;
    if (!this.isFormValid()) return;

    const payload = { email: this.model.email, password: this.model.password };
    await this.storageService.saveToStorage(
      AppConstants.DATABASE_KEYS.LOGIN_DETAILS,
      payload
    );
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
