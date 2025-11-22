import { Injectable } from "@angular/core";
import { AppConstants } from "src/app/app-constants";
import {
  AdditionalRequestDetails,
  Authentication,
} from "../models/internal/additional-request-details";
import { BaseApiClient } from "./base-client/base-api.client";
import { CommonResponseCodeHandler } from "./helpers/common-response-code-handler.helper";
import { StorageCache } from "./helpers/storage-cache.helper";

import { StorageService } from "../services/storage.service";
import { TokenRequestSM } from "../models/service/app/token/token-request-s-m";
import { TokenResponseSM } from "../models/service/app/token/token-response-s-m";
import { ApiRequest } from "../models/service/foundation/api-contracts/base/api-request";
import { ApiResponse } from "../models/service/foundation/api-contracts/base/api-response";

@Injectable({
  providedIn: "root",
})
export class AutomationClient extends BaseApiClient {
  constructor(
    storageService: StorageService,

    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }

  /**
   *
   * @param tokenRequestSM
   * @returns reno app token
   */
  GenerateAutomationToken = async (
    tokenRequestSM: ApiRequest<TokenRequestSM>
  ): Promise<ApiResponse<TokenResponseSM>> => {
    let resp = await this.GetResponseAsync<TokenRequestSM, TokenResponseSM>(
      `${AppConstants.API_ENDPOINTS.ACCOUNT_URL}/ValidateLoginAndGenerateToken`,
      "POST",
      tokenRequestSM,
      new AdditionalRequestDetails<TokenResponseSM>(false, Authentication.false)
    );
    return resp;
  };
}
