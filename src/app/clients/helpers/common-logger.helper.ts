import { AppConstants } from "src/app/app-constants";
import { StorageService } from "src/app/services/storage.service";
import { environment } from "src/environments/environment";
import { LoggerClient } from "../logger.client";
import { LogLocation } from "src/app/models/internal/log-location";
import { LogType } from "src/app/models/internal/log-type";
import { LoggerConfig } from "src/app/models/internal/logger-config";
import { ApiRequest } from "src/app/models/service/foundation/api-contracts/base/api-request";
import { ApiErrorTypeSM } from "src/app/models/service/foundation/enums/api-error-type-s-m.enum";
import { App } from "@capacitor/app";
import { SampleErrorLogModel } from "src/app/models/internal/sample-error-model";
// import { promises as fs } from "fs";
export class CommonLogger {
  private static storageService: StorageService;

  private static loggerConfig: LoggerConfig = (() => {
    return CommonLogger.GetDefaultLoggerConfigObject();
  })(); // self executing setter

  private static loggerClient: LoggerClient = (() => {
    return new LoggerClient();
  })(); // self executing setter

  constructor() {
    throw new Error('Cannot instantiate static class "Logger".');
  }

  private static GetDefaultLoggerConfigObject(): LoggerConfig {
    const logConfig = new LoggerConfig();
    logConfig.exceptionLogLocations =
      environment.LoggingInfo.ExceptionLocation.split(",")
        .map((s) => s.trim())
        .map((s) => LogLocation[s as keyof typeof LogLocation])
        .filter((v): v is LogLocation => typeof v === "number");
    logConfig.logLocations = environment.LoggingInfo.LogLocation.split(",")
      .map((s) => s.trim())
      .map((s) => LogLocation[s as keyof typeof LogLocation])
      .filter((v): v is LogLocation => typeof v === "number");
    // if (environment.LoggingInfo.logToConsole)
    //   logConfig.logLocations.push(LogLocation.Console);
    // if (environment.LoggingInfo.logToApi)
    //   logConfig.logLocations.push(LogLocation.Api);
    // if (environment.LoggingInfo.logToElasticCluster)
    //   logConfig.logLocations.push(LogLocation.ElasticCluster);
    // if (environment.LoggingInfo.exceptionToApi)
    //   logConfig.exceptionLogLocations.push(LogLocation.Api);

    // if (environment.LoggingInfo.exceptionToConsole)
    //   logConfig.exceptionLogLocations.push(LogLocation.Console);
    // if (environment.LoggingInfo.exceptionToElasticCluster)
    //   logConfig.exceptionLogLocations.push(LogLocation.ElasticCluster);
    // if (environment.LoggingInfo.exceptionToFile)
    //   logConfig.exceptionLogLocations.push(LogLocation.File);

    if (logConfig.exceptionLogLocations.length == 0)
      logConfig.exceptionLogLocations.push(LogLocation.None);
    if (logConfig.logLocations.length == 0)
      logConfig.logLocations.push(LogLocation.None);
    return logConfig;
  }

  static async LogException(data: SampleErrorLogModel) {
    try {
      if (this.loggerConfig.exceptionLogLocations.includes(LogLocation.None))
        return;
      if (this.loggerConfig.exceptionLogLocations.includes(LogLocation.Console))
        console.log(data);
      if (this.loggerConfig.exceptionLogLocations.includes(LogLocation.File))
        await this.AddItemToIndexDb(LogType.Exception, data);
      if (this.loggerConfig.exceptionLogLocations.includes(LogLocation.Api))
        await this.AddItemToApi(LogType.Exception, data);
    } catch (error) {
      console.log(error);
    }
  }

  static async LogTextOrObject(data: any) {
    try {
      if (this.loggerConfig.logLocations.includes(LogLocation.Console))
        console.log(data);
      if (this.loggerConfig.logLocations.includes(LogLocation.File))
        await this.AddItemToIndexDb(LogType.Log, data);
    } catch (error) {
      console.log(error);
    }
  }
  public static async AddItemToIndexDb(
    logType: LogType,
    data: any
  ): Promise<void> {
    try {
      if (this.storageService) {
        let key = "";
        if (logType == LogType.Exception)
          key = AppConstants.DATABASE_KEYS.EXCEPTION_LOGS;
        else key = AppConstants.DATABASE_KEYS.APP_LOGS;
        let existingLogs: SampleErrorLogModel[] =
          await this.storageService.getFromStorage(key);
        if (!Array.isArray(existingLogs)) {
          existingLogs = [];
        }
        if (!(data instanceof SampleErrorLogModel)) {
          let sampleError = await this.convertToSampleErrorLogModel(data);
          existingLogs.push(sampleError);
        } else existingLogs.push(data);
        // Optional: keep only last 100 logs
        const MAX_LOGS = 100;
        const trimmedLogs = existingLogs.slice(-MAX_LOGS);

        await this.storageService.saveToStorage(key, trimmedLogs);
      }
    } catch (error) {}
  }

  private static async AddItemToApi(logType: LogType, data: any) {
    // return; //for now
    try {
      let errorLog: SampleErrorLogModel;
      let errorLogs: SampleErrorLogModel[] = [];
      if (!(data instanceof SampleErrorLogModel)) {
        errorLog = await this.convertToSampleErrorLogModel(data);
        errorLogs.push(errorLog);
      } else errorLogs.push(data);
      var logData: ApiRequest<SampleErrorLogModel[]> = new ApiRequest<
        SampleErrorLogModel[]
      >();
      logData.reqData = errorLogs;
      CommonLogger.loggerClient.SendLogsToServerAsync(errorLogs, null);
    } catch (error) {}
  }

  private static async convertToSampleErrorLogModel(data: any) {
    const additionalProps = new Map<string, string>();
    let platform = await this.storageService.getFromStorage(
      AppConstants.DATABASE_KEYS.PLATFORM
    );
    additionalProps.set("data", String(data));
    additionalProps.set("Page", window.location.href);
    additionalProps.set("Platform", platform);
    return {
      apiErrorType: ApiErrorTypeSM.Fatal_Log,
      displayMessage: AppConstants.ERROR_PROMPTS.Unknown_Error,
      additionalProps: additionalProps,
      message: CommonLogger.getSafeString(data?.message ?? data),
      name: CommonLogger.getSafeString(data?.name ?? "Unknown"),
      cause: CommonLogger.getSafeString(data?.cause ?? null),
      stack: CommonLogger.getSafeString(data?.stack ?? null),
      createdOnUTC: new Date().toISOString(),
    };
  }

  private static getSafeString(value: unknown): string {
    if (value == null) return "";
    try {
      return typeof value === "string" ? value : JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
}
