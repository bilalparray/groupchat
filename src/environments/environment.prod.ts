export const environment = {
  production: true,
  apiBaseUrl: 'http://192.168.29.57:8081/api/v1',
  applicationName: 'GroupChat',
  applicationVersion: '1.0.0',
  indexedDBName: 'GroupChatDB',
  indexedDBVersion: 1,
  enableResponseCacheProcessing: true,
  apiResponseCacheTimeoutInMinutes: 5,
  LoggingInfo: {
    LogLocation: 'Console', // keep minimal
    ExceptionLocation: 'Console', // keep minimal
    logToConsole: false, // disable verbose console logs in prod
    logToFile: false, // browsers can't write files; keep false
    logToApi: true, // if you need logs, POST to secure server endpoint
    logToElasticCluster: false, // handled server-side only
    exceptionToConsole: false, // avoid printing exceptions to console in prod
    exceptionToFile: false,
    exceptionToApi: true, // send exceptions to server-side monitoring
    exceptionToElasticCluster: false,
    cacheLogs: false, // avoid caching logs client-side
  },
  encryptionKey: '12345678901234567890123456789012',
};
