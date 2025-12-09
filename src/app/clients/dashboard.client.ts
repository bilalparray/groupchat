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
import { ApiRequest } from '../models/service/foundation/api-contracts/base/api-request';
import { GenerateGuestKeyRequest } from '../models/service/app/v1/generate-guest-key-request-sm';
import { GuestKeyResponse } from '../models/service/app/v1/generate-guest-key-response-sm';

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

  GenerateGuestKey = async (
    department: ApiRequest<GenerateGuestKeyRequest>
  ): Promise<ApiResponse<GuestKeyResponse>> => {
    let resp = await this.GetResponseAsync<
      GenerateGuestKeyRequest,
      GuestKeyResponse
    >(
      `${AppConstants.API_ENDPOINTS.GENERATE_KEY}`,
      'POST',

      department
    );
    return resp;
  };
}
