import { Injectable } from "@angular/core";
import { ProfileClient } from "../clients/profile.client";
import { BaseService } from "./base.service";
import { AppConstants } from "../app-constants";
import { ClientUserSM } from "../models/service/app/v1/app-users/client-user-s-m";
import { ApiRequest } from "../models/service/foundation/api-contracts/base/api-request";
import { ApiResponse } from "../models/service/foundation/api-contracts/base/api-response";
import { BoolResponseRoot } from "../models/service/foundation/common-response/bool-response-root";
import { DeleteResponseRoot } from "../models/service/foundation/common-response/delete-response-root";
import { SetPasswordRequestSM } from "../models/service/app/v1/app-users/set-password-request-s-m";
import { UpdatePasswordRequestSM } from "../models/service/app/v1/app-users/update-password-request-s-m";
import { SampleErrorLogModel } from "../models/internal/sample-error-model";

@Injectable({
  providedIn: "root",
})
export class ProfileService extends BaseService {
  constructor(private profileClient: ProfileClient) {
    super();
  }

  async GetUserProfileDetails(): Promise<ApiResponse<ClientUserSM>> {
    let resp = await this.profileClient.GetUserProfileDetails();
    if (resp.isError) {
      throw new SampleErrorLogModel({
        message: "Error from api in GetUserProfileDetails",
        displayMessage: resp.errorData?.displayMessage,
        apiErrorType: resp.errorData?.apiErrorType,
        additionalProps: resp.errorData?.additionalProps,
        name: "Error in GetUserProfileDetails",
      });
    }
    return resp;
  }

  async UpdateUserProfile(
    register: ClientUserSM
  ): Promise<ApiResponse<BoolResponseRoot>> {
    if (register == null) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<ClientUserSM>();
      apiRequest.reqData = register;
      let resp = await this.profileClient.UpdateUserProfile(apiRequest);
      if (resp.isError) {
        throw new SampleErrorLogModel({
          message: "Error from api in UpdateUserProfile",
          displayMessage: resp.errorData?.displayMessage,
          apiErrorType: resp.errorData?.apiErrorType,
          additionalProps: resp.errorData?.additionalProps,
          name: "Error in UpdateUserProfile",
        });
      }
      return resp;
    }
  }
  async SetPassword(
    setpassword: SetPasswordRequestSM
  ): Promise<ApiResponse<BoolResponseRoot>> {
    if (setpassword == null) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<SetPasswordRequestSM>();
      apiRequest.reqData = setpassword;
      let resp = await this.profileClient.SetPassword(apiRequest);
      if (resp.isError) {
        throw new SampleErrorLogModel({
          message: "Error from api in setting new password",
          displayMessage: resp.errorData?.displayMessage,
          apiErrorType: resp.errorData?.apiErrorType,
          additionalProps: resp.errorData?.additionalProps,
          name: "Error in setting password",
        });
      }
      return resp;
    }
  }

  async UpdatePassword(
    updatepassword: UpdatePasswordRequestSM
  ): Promise<ApiResponse<BoolResponseRoot>> {
    if (updatepassword == null) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<UpdatePasswordRequestSM>();
      apiRequest.reqData = updatepassword;
      let resp = await this.profileClient.UpdatePassword(apiRequest);
      if (resp.isError) {
        throw new SampleErrorLogModel({
          message: "Error from api in updating new password",
          displayMessage: resp.errorData?.displayMessage,
          apiErrorType: resp.errorData?.apiErrorType,
          additionalProps: resp.errorData?.additionalProps,
          name: "Error in updating password",
        });
      }
      return resp;
    }
  }
  async DeleteAccount(): Promise<ApiResponse<DeleteResponseRoot>> {
    let resp = await this.profileClient.DeleteAccount();
    if (resp.isError) {
      throw new SampleErrorLogModel({
        message: "Error from api in DeleteAccount",
        displayMessage: resp.errorData?.displayMessage,
        apiErrorType: resp.errorData?.apiErrorType,
        additionalProps: resp.errorData?.additionalProps,
        name: "Error in DeleteAccount",
      });
    }
    return resp;
  }
}
