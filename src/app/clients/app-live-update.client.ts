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
import { AppBundleSM } from "../models/service/app/v1/client/app-bundle-s-m";
import { ApiResponse } from "../models/service/foundation/api-contracts/base/api-response";

@Injectable({
  providedIn: "root",
})
export class AppLiveUpdateClient extends BaseApiClient {
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
  GetAppLiveUpdate = async (): Promise<ApiResponse<AppBundleSM>> => {
    let resp = await this.GetResponseAsync<number, AppBundleSM>(
      `${AppConstants.API_ENDPOINTS.ApplicationFile}/bundle`,
      "GET",
      null,
      new AdditionalRequestDetails<AppBundleSM>(
        false,
        Authentication.automationToken
      )
    );
    return resp;
  };
}
