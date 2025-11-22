import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { BaseApiClient } from "./base-client/base-api.client";
import { CommonResponseCodeHandler } from "./helpers/common-response-code-handler.helper";
import { StorageCache } from "./helpers/storage-cache.helper";
import {
  AdditionalRequestDetails,
  Authentication,
} from "../models/internal/additional-request-details";
import { AppConstants } from "../app-constants";
import { TokenResponseSM } from "../models/service/app/token/token-response-s-m";
import { SocialLoginSM } from "../models/service/app/v1/app-users/social-login-s-m";
import { ApiRequest } from "../models/service/foundation/api-contracts/base/api-request";
import { ApiResponse } from "../models/service/foundation/api-contracts/base/api-response";

@Injectable({
  providedIn: "root",
})
export class SocialLoginClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(
      storageService,
      storageCache,
      commonResponseCodeHandler
    );
  }

  // social-login-client.ts
  /**
   * Login With Google
   * @param socialLogin
   */
  async LoginWithGoogle(
    socialLogin: ApiRequest<SocialLoginSM>
  ): Promise<ApiResponse<TokenResponseSM>> {
    return this.GetResponseAsync<SocialLoginSM, TokenResponseSM>(
      `${AppConstants.API_ENDPOINTS.EXTERNAL_USER}/login`,
      "POST",
      socialLogin,
      new AdditionalRequestDetails<TokenResponseSM>(false, Authentication.false)
    );
  }

  async RegisterWithGoogle(
    socialRegister: ApiRequest<SocialLoginSM>
  ): Promise<ApiResponse<TokenResponseSM>> {
    return this.GetResponseAsync<SocialLoginSM, TokenResponseSM>(
      `${AppConstants.API_ENDPOINTS.EXTERNAL_USER}/signup`,
      "POST",
      socialRegister,
      new AdditionalRequestDetails<TokenResponseSM>(false, Authentication.false)
    );
  }
  async RegisterWithApple(
    socialRegister: ApiRequest<SocialLoginSM>
  ): Promise<ApiResponse<TokenResponseSM>> {
    return this.GetResponseAsync<SocialLoginSM, TokenResponseSM>(
      `${AppConstants.API_ENDPOINTS.EXTERNAL_USER}/signup`,
      "POST",
      socialRegister,
      new AdditionalRequestDetails<TokenResponseSM>(false, Authentication.false)
    );
  }

  async LoginWithApple(
    socialLogin: ApiRequest<SocialLoginSM>
  ): Promise<ApiResponse<TokenResponseSM>> {
    return this.GetResponseAsync<SocialLoginSM, TokenResponseSM>(
      `${AppConstants.API_ENDPOINTS.EXTERNAL_USER}/login`,
      "POST",
      socialLogin,
      new AdditionalRequestDetails<TokenResponseSM>(false, Authentication.false)
    );
  }
}
