import { Injectable } from "@angular/core";
import { AppVersionClient } from "../clients/app-version.client";
import { BaseService } from "./base.service";
import { ApiResponse } from "../models/service/foundation/api-contracts/base/api-response";
import { AppInformationSM } from "../models/service/app/v1/client/app-information-s-m";
import { SampleErrorLogModel } from "../models/internal/sample-error-model";

@Injectable({
  providedIn: "root",
})
export class AppVersionService extends BaseService {
  constructor(private appVersionClient: AppVersionClient) {
    super();
  }

  async GetAllVersionInfo(): Promise<ApiResponse<AppInformationSM>> {
    let resp = await this.appVersionClient.GetAllVersionInfo();
    if (resp.isError) {
      throw new SampleErrorLogModel({
        message: "Error from api in GetAllVersionInfo",
        displayMessage: resp.errorData?.displayMessage,
        apiErrorType: resp.errorData?.apiErrorType,
        additionalProps: resp.errorData?.additionalProps,
        name: "Error in GetAllVersionInfo",
      });
    }
    return resp;
  }
}
