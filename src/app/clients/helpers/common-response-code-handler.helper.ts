import { AxiosResponse } from 'axios';
import { Injectable } from '@angular/core';
import { AppConstants } from '../../app-constants';
import { Router } from '@angular/router';
import { IDictionaryCollection } from 'src/app/models/internal/Idictionary-collection';
import { DictionaryCollection } from 'src/app/models/internal/dictionary-collection';
import { CommonService } from 'src/app/services/common.service';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CommonResponseCodeHandler {
  //dont extend from base

  public handlerDict: IDictionaryCollection<
    string,
    (resp: AxiosResponse) => string
  >;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private storageService: StorageService
  ) {
    // add common functions here
    this.handlerDict = new DictionaryCollection<
      string,
      (resp: AxiosResponse) => string
    >();
    this.AddCommonHandlers();
  }

  async AddCommonHandlers() {
    this.handlerDict.Add('401', (resp) => {
      this.storageService.removeFromStorage(
        AppConstants.DATABASE_KEYS.ACCESS_TOKEN
      );
      this.router.navigate([AppConstants.WEB_ROUTES.ENDUSER.LOGIN]);

      // Extract display message
      const res = resp.request.response;

      const parsed = typeof res === 'string' ? JSON.parse(res) : res;
      const displayMessage =
        parsed?.errorData?.displayMessage ||
        AppConstants.ERROR_PROMPTS.Unauthorized_User;

      return displayMessage;
    });
  }
}
