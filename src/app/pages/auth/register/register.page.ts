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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPage {
  model = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  touched: { [key: string]: boolean } = {
    email: false,
    password: false,
    confirmPassword: false,
  };

  constructor(private router: Router) {}

  onBlur(field: 'email' | 'password' | 'confirmPassword') {
    this.touched[field] = true;
  }

  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  passwordsMatch(): boolean {
    return this.model.password === this.model.confirmPassword;
  }

  showError(field: 'email' | 'password' | 'confirmPassword'): boolean {
    if (!this.touched[field]) return false;

    if (field === 'email') {
      return !this.model.email || !this.isValidEmail(this.model.email);
    }

    if (field === 'password') {
      return !this.model.password || this.model.password.length < 6;
    }

    if (field === 'confirmPassword') {
      // show error when confirm is empty, too short, or does not match password
      if (!this.model.confirmPassword || this.model.confirmPassword.length < 6)
        return true;
      if (!this.passwordsMatch()) return true;
      return false;
    }

    return false;
  }

  isFormValid(): boolean {
    return (
      !!this.model.email &&
      this.isValidEmail(this.model.email) &&
      !!this.model.password &&
      this.model.password.length >= 6 &&
      !!this.model.confirmPassword &&
      this.model.confirmPassword.length >= 6 &&
      this.passwordsMatch()
    );
  }

  submit(form: any) {
    // mark all fields as touched so validation messages appear if invalid
    // mark all fields as touched so validation messages appear if invalid
    this.touched['email'] = true;
    this.touched['password'] = true;
    this.touched['confirmPassword'] = true;

    if (!this.isFormValid()) return;

    // Replace this with actual registration call
    console.log('Register payload:', {
      email: this.model.email,
      password: this.model.password,
      confirmPassword: this.model.confirmPassword,
    });

    // Example: navigate to a verify / home page after successful registration
    // this.router.navigate(['/verify']);
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
