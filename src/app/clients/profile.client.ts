import { Injectable } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { BaseApiClient } from "./base-client/base-api.client";
import { CommonResponseCodeHandler } from "./helpers/common-response-code-handler.helper";
import { StorageCache } from "./helpers/storage-cache.helper";
import { environment } from "src/environments/environment";
import { AppConstants } from "../app-constants";
import { AdditionalRequestDetails, Authentication } from "../models/internal/additional-request-details";
import { ClientUserSM } from "../models/service/app/v1/app-users/client-user-s-m";
import { ApiRequest } from "../models/service/foundation/api-contracts/base/api-request";
import { ApiResponse } from "../models/service/foundation/api-contracts/base/api-response";
import { BoolResponseRoot } from "../models/service/foundation/common-response/bool-response-root";
import { DeleteResponseRoot } from "../models/service/foundation/common-response/delete-response-root";
import { SetPasswordRequestSM } from "../models/service/app/v1/app-users/set-password-request-s-m";
import { UpdatePasswordRequestSM } from "../models/service/app/v1/app-users/update-password-request-s-m";

@Injectable({
  providedIn: "root",
})
export class ProfileClient extends BaseApiClient {
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

  GetUserProfileDetails = async (): Promise<ApiResponse<ClientUserSM>> => {
    let resp = await this.GetResponseAsync<number, ClientUserSM>(
      `${AppConstants.API_ENDPOINTS.CLIENT_USER}/mine`,
      "GET"
    );
    return resp;
  };

  UpdateUserProfile = async (
    addUserRequest: ApiRequest<ClientUserSM>
  ): Promise<ApiResponse<BoolResponseRoot>> => {
    let resp = await this.GetResponseAsync<ClientUserSM, BoolResponseRoot>(
      `${AppConstants.API_ENDPOINTS.CLIENT_USER}/mine`,
      "PUT",
      addUserRequest,
      new AdditionalRequestDetails<BoolResponseRoot>(false, Authentication.true)
    );
    return resp;
  };

  SetPassword = async (
    setPassword: ApiRequest<SetPasswordRequestSM>
  ): Promise<ApiResponse<BoolResponseRoot>> => {
    let resp = await this.GetResponseAsync<
      SetPasswordRequestSM,
      BoolResponseRoot
    >(
      `${AppConstants.API_ENDPOINTS.CLIENT_USER}/SetPassword`,
      "POST",
      setPassword,
      new AdditionalRequestDetails<BoolResponseRoot>(false, Authentication.true)
    );
    return resp;
  };
  UpdatePassword = async (
    updatePassword: ApiRequest<UpdatePasswordRequestSM>
  ): Promise<ApiResponse<BoolResponseRoot>> => {
    let resp = await this.GetResponseAsync<
      UpdatePasswordRequestSM,
      BoolResponseRoot
    >(
      `${AppConstants.API_ENDPOINTS.CLIENT_USER}/UpdatePassword`,
      "POST",
      updatePassword,
      new AdditionalRequestDetails<BoolResponseRoot>(false, Authentication.true)
    );
    return resp;
  };
  DeleteAccount = async (): Promise<ApiResponse<DeleteResponseRoot>> => {
    let resp = await this.GetResponseAsync<null, DeleteResponseRoot>(
      `${AppConstants.API_ENDPOINTS.CLIENT_USER}/mine?companyCode=${environment.companyCode}`,
      "DELETE",
      null,
      new AdditionalRequestDetails<DeleteResponseRoot>(
        false,
        Authentication.true
      )
    );
    return resp;
  };
}
