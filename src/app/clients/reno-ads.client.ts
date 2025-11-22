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
import { ApiResponse } from "../models/service/foundation/api-contracts/base/api-response";
import { RenoAdsSM } from "../models/service/app/v1/general/ads/reno-ads-s-m";

@Injectable({
  providedIn: "root",
})
export class RenoAdsClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }

  GetRenoAds = async (): Promise<ApiResponse<RenoAdsSM[]>> => {
    let resp = await this.GetResponseAsync<number, RenoAdsSM[]>(
      `${AppConstants.API_ENDPOINTS.RENO_ADS}`,
      "GET",
      null,
      new AdditionalRequestDetails<RenoAdsSM[]>(
        false,
        Authentication.automationToken
      )
    );

    return resp;
  };
}
