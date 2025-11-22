import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { BaseApiClient } from "./base-client/base-api.client";
import { CommonResponseCodeHandler } from "./helpers/common-response-code-handler.helper";
import { StorageCache } from "./helpers/storage-cache.helper";
import { AppConstants } from "../app-constants";
import {
  AdditionalRequestDetails,
  Authentication,
} from "../models/internal/additional-request-details";
import { FeedbackSM } from "../models/service/app/v1/feedbacks/feedback-s-m";
import { ApiRequest } from "../models/service/foundation/api-contracts/base/api-request";
import { ApiResponse } from "../models/service/foundation/api-contracts/base/api-response";
import { BoolResponseRoot } from "../models/service/foundation/common-response/bool-response-root";

@Injectable({
  providedIn: "root",
})
export class FeedBackClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(storageService, storageCache, commonResponseCodeHandler);
  }

  SubmitFeedback = async (
    feedbackRequestSM: ApiRequest<FeedbackSM>
  ): Promise<ApiResponse<BoolResponseRoot>> => {
    let resp = await this.GetResponseAsync<FeedbackSM, BoolResponseRoot>(
      `${AppConstants.API_ENDPOINTS.FEEDBACK}`,
      "POST",
      feedbackRequestSM,
      new AdditionalRequestDetails<BoolResponseRoot>(
        false,
        Authentication.automationToken
      )
    );
    return resp;
  };
}
