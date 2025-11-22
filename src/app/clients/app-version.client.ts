import { Injectable } from "@angular/core";
import { AppConstants } from "../app-constants";
import {
  AdditionalRequestDetails,
  Authentication,
} from "../models/internal/additional-request-details";
import { StorageService } from "../services/storage.service";
import { BaseApiClient } from "./base-client/base-api.client";
import { CommonResponseCodeHandler } from "./helpers/common-response-code-handler.helper";
import { StorageCache } from "./helpers/storage-cache.helper";
import { AppInformationSM } from "../models/service/app/v1/client/app-information-s-m";
import { ApiResponse } from "../models/service/foundation/api-contracts/base/api-response";

@Injectable({
  providedIn: "root",
})
export class AppVersionClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }

  /**
   *
   * @returns App vaersion info
   */
  GetAllVersionInfo = async (): Promise<ApiResponse<AppInformationSM>> => {
    let resp = await this.GetResponseAsync<number, AppInformationSM>(
      `${AppConstants.API_ENDPOINTS.ClientCompanyAdditionalInfo}/VersionInfo`,
      "GET",
      null,
      new AdditionalRequestDetails<AppInformationSM>(
        false,
        Authentication.automationToken
      )
    );
    return resp;
  };
}
