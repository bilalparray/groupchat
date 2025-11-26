import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import {
  AdditionalRequestDetails,
  Authentication,
} from '../models/internal/additional-request-details';
import { BaseApiClient } from './base-client/base-api.client';
import { CommonResponseCodeHandler } from './helpers/common-response-code-handler.helper';
import { StorageCache } from './helpers/storage-cache.helper';
import { environment } from 'src/environments/environment';
import { TokenRequestSM } from '../models/service/app/token/token-request-s-m';
import { TokenResponseSM } from '../models/service/app/token/token-response-s-m';
import { ClientUserSM } from '../models/service/app/v1/app-users/client-user-s-m';
import { ApiRequest } from '../models/service/foundation/api-contracts/base/api-request';
import { ApiResponse } from '../models/service/foundation/api-contracts/base/api-response';
import { BoolResponseRoot } from '../models/service/foundation/common-response/bool-response-root';
import { IntResponseRoot } from '../models/service/foundation/common-response/int-response-root';
import { StorageService } from '../services/storage.service';
import { ForgotPasswordSM } from '../models/service/app/v1/app-users/forgot-password-s-m';
import { ResetPasswordRequestSM } from '../models/service/app/v1/app-users/reset-password-request-s-m';
import { VerifyEmailRequestSM } from '../models/service/app/v1/app-users/verify-email-request-s-m';

@Injectable({
  providedIn: 'root',
})
export class AccountsClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }
  GenerateToken = async (
    tokenRequestSM: ApiRequest<TokenRequestSM>
  ): Promise<ApiResponse<TokenResponseSM>> => {
    let resp = await this.GetResponseAsync<TokenRequestSM, TokenResponseSM>(
      `${AppConstants.API_ENDPOINTS.LOGIN}`,
      'POST',
      tokenRequestSM,
      new AdditionalRequestDetails<TokenResponseSM>(false, Authentication.false)
    );
    return resp;
  };

  Register = async (
    addUserRequest: ApiRequest<ClientUserSM>
  ): Promise<ApiResponse<BoolResponseRoot>> => {
    let resp = await this.GetResponseAsync<ClientUserSM, BoolResponseRoot>(
      `${AppConstants.API_ENDPOINTS.CLIENT_USER}?companyCode=${environment}`,
      'POST',
      addUserRequest,
      new AdditionalRequestDetails<BoolResponseRoot>(
        false,
        Authentication.false
      )
    );
    return resp;
  };

  VerifyEmail = async (
    verifyEmail: ApiRequest<VerifyEmailRequestSM>
  ): Promise<ApiResponse<VerifyEmailRequestSM>> => {
    let resp = await this.GetResponseAsync<
      VerifyEmailRequestSM,
      VerifyEmailRequestSM
    >(
      `${AppConstants.API_ENDPOINTS.CLIENT_USER}/VerifyEmail`,
      'POST',
      verifyEmail,
      new AdditionalRequestDetails<VerifyEmailRequestSM>(
        false,
        Authentication.false
      )
    );
    return resp;
  };

  ResetPassword = async (
    resetPasswordRequest: ApiRequest<ResetPasswordRequestSM>
  ): Promise<ApiResponse<ResetPasswordRequestSM>> => {
    let resp = await this.GetResponseAsync<
      ResetPasswordRequestSM,
      ResetPasswordRequestSM
    >(
      `${AppConstants.API_ENDPOINTS.CLIENT_USER}/ResetPassword`,
      'POST',
      resetPasswordRequest,
      new AdditionalRequestDetails<ResetPasswordRequestSM>(
        false,
        Authentication.false
      )
    );
    return resp;
  };

  ForgotPassword = async (
    forgotPasswordRequest: ApiRequest<ForgotPasswordSM>
  ): Promise<ApiResponse<IntResponseRoot>> => {
    let resp = await this.GetResponseAsync<ForgotPasswordSM, IntResponseRoot>(
      `${AppConstants.API_ENDPOINTS.CLIENT_USER}/ForgotPassword`,
      'POST',
      forgotPasswordRequest,
      new AdditionalRequestDetails<IntResponseRoot>(false, Authentication.false)
    );
    return resp;
  };
}
