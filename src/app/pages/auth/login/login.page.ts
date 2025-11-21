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
  IonInput, // <-- required
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // required for [(ngModel)]
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonButtons,
    IonList,
    IonItem,
    IonLabel,
    IonInput, // <-- make sure this is present
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

  constructor(private router: Router) {}

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

  submit(form: any) {
    this.touched['email'] = true;
    this.touched['password'] = true;
    if (!this.isFormValid()) return;
    console.log('Login payload:', {
      email: this.model.email,
      password: this.model.password,
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
