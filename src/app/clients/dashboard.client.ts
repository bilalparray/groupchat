import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { ApiResponse } from '../models/service/foundation/api-contracts/base/api-response';
import { StorageService } from '../services/storage.service';
import { BaseApiClient } from './base-client/base-api.client';
import { CommonResponseCodeHandler } from './helpers/common-response-code-handler.helper';
import { StorageCache } from './helpers/storage-cache.helper';
import {
  AdditionalRequestDetails,
  Authentication,
} from '../models/internal/additional-request-details';

@Injectable({
  providedIn: 'root',
})
export class DashboardClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }

  GenerateGuestKey = async (): Promise<ApiResponse<any>> => {
    let resp = await this.GetResponseAsync<null, any>(
      `${AppConstants.API_ENDPOINTS.GENERATE_KEY}`,
      'POST',
      null
    );
    return resp;
  };
}
