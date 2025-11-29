// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  applicationName: 'GroupChat',
  apiBaseUrl: 'http://192.168.29.57:8081/api/v1',
  applicationVersion: '1.0.0',
  indexedDBName: 'GroupChatDB',
  indexedDBVersion: 1,
  enableResponseCacheProcessing: false,
  apiResponseCacheTimeoutInMinutes: 5,
  LoggingInfo: {
    LogLocation: 'File,Console',
    ExceptionLocation: 'File,Console',
    logToConsole: true,
    logToFile: true,
    logToApi: false,
    logToElasticCluster: false,
    exceptionToConsole: true,
    exceptionToFile: true,
    exceptionToApi: false,
    exceptionToElasticCluster: false,
    cacheLogs: true,
  },
  encryptionKey: '12345678901234567890123456789012',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
