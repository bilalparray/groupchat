import { environment } from 'src/environments/environment';

// TODO: MOVE ALL CONSTANTS HERE
export const AppConstants = {
  API_ENDPOINTS: {
    LOG_URL: 'http://localhost:3000/api/log',
    CLIENT_USER: 'clientUser',
    LOGIN: 'login',
    REGISTER: 'register',
  },
  DATABASE_KEYS: {
    USER: 'USER',
    LOGIN_DETAILS: 'LOGIN_DETAILS',
    REMEMBER_PWD: 'REMEMBER_PWD',
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    PLATFORM: 'PLATFORM',
    APP_LOGS: 'APP_LOGS',
    EXCEPTION_LOGS: 'EXCEPTION_LOGS',
    API_RESP_CACHE: 'API_RESP_CACHE',
    AUTOMATION_TOKEN: 'AUTOMATION_TOKEN',
  },
  DATABASE_DEFAULT_VALUES: {},
  ERROR_PROMPTS: {
    App_StartError: 'Error occured. Please restart the application.',
    Load_Data_Error: 'Error in loading data. Please try again.',
    Invalid_Input_Data: 'Invalid data.Please try again.',
    Unknown_Error: 'Error occured. Please try again.',
    Network_Error: 'Please check network and try again.',
    Save_Data_Error: 'Error in saving. Please try again.',
    Delete_Data_Error: 'Error in delete. Please try again.',
    Permission_Error: 'Permission denied.',
    Unauthorized_User: 'User not authorized. Please relogin.',
  },
  HEADER_NAMES: {
    ApiType: 'targetapitype',
    DevApk: 'isdeveloperapk',
    AppVersion: 'appversion',
    // CORS_ALLOW_ORIGIN: "Access-Control-Allow-Origin",
    // CORS_ALLOW_METHODS: "Access-Control-Allow-Methods",
    // CORS_ALLOW_CREDENTIALS: "Access-Control-Allow-Credentials",
  },
  HEADER_VALUES: {
    ApiType: 'abcd',
    DevApk: (!environment.production).toString(),
    AppVersion: environment.applicationVersion,
    // CORS_ALLOW_ORIGIN: "http://localhost:4200",
    // CORS_ALLOW_METHODS: "GET, POST, OPTIONS, DELETE, PUT",
    // CORS_ALLOW_CREDENTIALS: "true",
  },
  WEB_ROUTES: {
    ENDUSER: {
      SAMPLE: 'sample',
      DummyTeacher: 'dummyTeacher',
      UNAUTHORIZED: '',
      LOGIN: 'login',
      HOME: 'home',
      REGISTER: 'register',
      GUEST: 'guest',
      DASHBOARD: 'dashboard',
    },
    SUPERADMIN: {
      LOGIN: 'superadmin/login',
      DASHBOARD: 'superadmin/dashboard',
    },
    NOTFOUND: '**',
  },
  TOKEN_KEY_NAMES: {
    Role: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
    Expiry: 'exp',
    CompanyCode: 'clCd',
    Audience: 'aud',
    CompanyId: 'clId',
    RecordId: 'dbRId',
    EmailAddress:
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
    UserName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
    GivenName:
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
    Issuer: 'iss',
    TokenStart: 'nbf',
  },
};
