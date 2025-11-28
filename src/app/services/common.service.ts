import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { LayoutViewModel, LoaderInfo } from '../models/internal/common-models';
import { SweetAlertOptions } from '../models/internal/custom-sweet-alert-options';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastController, LoadingController } from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';
import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support';
declare var Swal: any;
@Injectable({
  providedIn: 'root',
})
export class CommonService extends BaseService {
  layoutViewModel: LayoutViewModel = new LayoutViewModel();
  showNav: boolean = true;
  loaderInfo: LoaderInfo = { message: '', showLoader: false };
  constructor(
    private ngxService: NgxUiLoaderService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {
    super();
  }
  handleEnterKey(event: any): void {
    // Handle Enter key
    if (event.key === 'Enter') {
      (event.target as HTMLElement).blur();
    }
  }
  async presentLoading(message: string = '') {
    this.ngxService.start();
    this.loaderInfo = { message, showLoader: true };
  }

  async presentAlert() {}

  /**Show custom sweet alert*/
  async showSweetAlertConfirmation(alertOptions: SweetAlertOptions) {
    // alertOptions.toast = false;
    return await Swal.fire(alertOptions);
  }

  /** Show a toast message as per options
   * @argument alertOptions Contains the properties of sweet alert like position, timer, text, title etc  */
  async showSweetAlertToast(alertOptions: SweetAlertOptions) {
    alertOptions.toast = true;
    if (!alertOptions.position) alertOptions.position = 'bottom';
    if (!alertOptions.showConfirmButton) alertOptions.showConfirmButton = false;
    if (!alertOptions.timer) alertOptions.timer = 3000;
    if (!alertOptions.timerProgressBar) alertOptions.timerProgressBar = true;
    alertOptions.didOpen = (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    };
    return await Swal.fire(alertOptions);
  }

  async dismissLoader() {
    this.ngxService.stop();
    this.loaderInfo.showLoader = false;
    this.loaderInfo.message = '';
  }

  /**Change Enum value  to string Array*/
  enumToStringArray(enumType: any) {
    const StringIsNumber = (value: any) => isNaN(Number(value)) === false;
    return Object.keys(enumType)
      .filter(StringIsNumber)
      .map((key) => enumType[key]);
  }

  /**Change Enum value to string*/
  singleEnumToString(enumme: any, selectedValue: any) {
    const StringIsNumber = (value: any) => isNaN(Number(value)) === false;
    var x = Object.keys(enumme)
      .filter(StringIsNumber)
      .map((key) => enumme[key])[selectedValue];
    return x;
  }

  async presentIonicToast(
    position: 'top' | 'middle' | 'bottom',
    msg: string,
    time?: number,
    cssClass?: string
  ) {
    const toast = await this.toastController.create({
      message: msg,
      duration: time,
      position: position,
      cssClass: cssClass,
    });

    await toast.present();
  }

  async presentIonicLoader(message: string, duration?: number) {
    const loading = await this.loadingCtrl.create({
      message,
      duration,
      spinner: 'circles',
    });

    await loading.present();
    return loading;
  }

  async getPlatform() {
    return Capacitor.getPlatform();
  }

  async enableEdgeToEdge() {
    if ((await this.getPlatform()) !== 'web') {
      await EdgeToEdge.enable();
    }
  }
}
