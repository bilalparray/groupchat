import { ErrorHandler, Injectable } from "@angular/core";
import { CommonLogger } from "../clients/helpers/common-logger.helper";
import { CommonService } from "./common.service";
import { AppConstants } from "../app-constants";
import { ApiErrorTypeSM } from "../models/service/foundation/enums/api-error-type-s-m.enum";
import { SampleErrorLogModel } from "../models/internal/sample-error-model";

@Injectable({
  providedIn: "root",
})
export class LogHandlerService implements ErrorHandler {
  constructor(private commonService: CommonService) {}

  async logObject(logObject: any) {
    // if (environment.LoggingInfo.logErrorsFromApi)
    await CommonLogger.LogTextOrObject(logObject);
    // else return;
  }

  async handleError(error: any) {
    try {
      //if any loader close that
      this.commonService.dismissLoader();
      //show error messages from app constants
      if (error instanceof SampleErrorLogModel) {
        this.commonService.showSweetAlertToast({
          icon: "error",
          title: "Error!",
          text: error.displayMessage,
        });
        //logging
        if (
          error.apiErrorType &&
          this.commonService
            .singleEnumToString(ApiErrorTypeSM, error.apiErrorType)
            .includes("Log")
        ) {
          await CommonLogger.LogException(error);
        } else {
          return;
        }
      } else {
        this.commonService.showSweetAlertToast({
          icon: "error",
          title: "Error!",
          text: AppConstants.ERROR_PROMPTS.Unknown_Error,
        });
        let sampleError: SampleErrorLogModel = {
          apiErrorType: ApiErrorTypeSM.Fatal_Log,
          displayMessage: AppConstants.ERROR_PROMPTS.Unknown_Error,
          additionalProps: new Map(),
          message: error.message,
          name: error.name,
          cause: error.cause,
          stack: error.stack,
          createdOnUTC: new Date().toISOString(),
        };
        await CommonLogger.LogException(sampleError);
      }
    } catch (error) {
      this.commonService.showSweetAlertToast({
        icon: "error",
        title: "Error!",
        text: AppConstants.ERROR_PROMPTS.Unknown_Error,
      });
    } finally {
    }
  }
}
