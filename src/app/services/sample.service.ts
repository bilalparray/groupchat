import { Injectable } from "@angular/core";
import { AppConstants } from "src/app/app-constants";
import { AccountsClient } from "../clients/accounts.client";
import { BaseService } from "./base.service";
import { SampleErrorLogModel } from "../models/internal/sample-error-model";
import { RoleTypeSM } from "../models/service/app/enums/role-type-s-m.enum";
import { TokenRequestSM } from "../models/service/app/token/token-request-s-m";
import { TokenResponseSM } from "../models/service/app/token/token-response-s-m";
import { ApiRequest } from "../models/service/foundation/api-contracts/base/api-request";
import { ApiResponse } from "../models/service/foundation/api-contracts/base/api-response";


@Injectable({
  providedIn: "root",
})
export class SampleService extends BaseService {
  constructor(private accountClient: AccountsClient) {
    super();
  }

  async generateToken(
    tokenReq: TokenRequestSM
  ): Promise<ApiResponse<TokenResponseSM>> {
    if (tokenReq == null || tokenReq.loginId == null) {
      // null checks
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<TokenRequestSM>();
      tokenReq.companyCode = "123";
      tokenReq.roleType = RoleTypeSM.ClientAdmin;
      apiRequest.reqData = tokenReq;
      let resp = await this.accountClient.GenerateToken(apiRequest);
      if (resp.isError) {
        throw new SampleErrorLogModel({
          message: "Error from api in Token Generation",
          displayMessage: resp.errorData?.displayMessage,
          apiErrorType: resp.errorData?.apiErrorType,
          additionalProps: resp.errorData?.additionalProps,
          name: "Error in Token Generation",
        });
      }
      return resp;
    }
  }
}
