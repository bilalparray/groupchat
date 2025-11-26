import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { AccountsClient } from '../clients/accounts.client';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { RoleTypeSM } from '../models/service/app/enums/role-type-s-m.enum';
import { TokenRequestSM } from '../models/service/app/token/token-request-s-m';
import { TokenResponseSM } from '../models/service/app/token/token-response-s-m';
import { ClientUserSM } from '../models/service/app/v1/app-users/client-user-s-m';
import { LoginUserSM } from '../models/service/app/v1/app-users/login/login-user-s-m';
import { ApiRequest } from '../models/service/foundation/api-contracts/base/api-request';
import { ApiResponse } from '../models/service/foundation/api-contracts/base/api-response';
import { BoolResponseRoot } from '../models/service/foundation/common-response/bool-response-root';
import { IntResponseRoot } from '../models/service/foundation/common-response/int-response-root';
import { LoginStatusSM } from '../models/service/app/enums/login-status-s-m.enum';
import { ForgotPasswordSM } from '../models/service/app/v1/app-users/forgot-password-s-m';
import { ResetPasswordRequestSM } from '../models/service/app/v1/app-users/reset-password-request-s-m';
import { VerifyEmailRequestSM } from '../models/service/app/v1/app-users/verify-email-request-s-m';
import { SampleErrorLogModel } from '../models/internal/sample-error-model';
import { SocialLoginSM } from '../models/service/app/v1/app-users/social-login-s-m';

@Injectable({
  providedIn: 'root',
})
export class AccountService extends BaseService {
  constructor(
    private accountClient: AccountsClient,
    private storageService: StorageService,
    private router: Router
  ) {
    super();
  }

  async generateToken(
    tokenReq: TokenRequestSM
  ): Promise<ApiResponse<TokenResponseSM>> {
    if (!tokenReq || !tokenReq.username) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<TokenRequestSM>();
      apiRequest.reqData = tokenReq;
      let resp = await this.accountClient.GenerateToken(apiRequest);
      if (!resp.isError && resp.successData != null) {
        this.storageService.saveToStorage(
          AppConstants.DATABASE_KEYS.ACCESS_TOKEN,
          resp.successData.accessToken
        );
        this.storageService.saveToStorage(
          AppConstants.DATABASE_KEYS.USER,
          tokenReq
        );
        this.storageService.saveToStorage(
          AppConstants.DATABASE_KEYS.LOGIN_DETAILS,
          resp.successData.loginUserDetails
        );
      } else {
        throw new SampleErrorLogModel({
          message: 'Error from api While Login',
          displayMessage: resp.errorData?.displayMessage,
          apiErrorType: resp.errorData?.apiErrorType,
          additionalProps: resp.errorData?.additionalProps,
          name: 'Error in login',
        });
      }
      return resp;
    }
  }
  getDummyTokenResp(req: TokenRequestSM): ApiResponse<TokenResponseSM> {
    // throw new Error('Method not implemented.');
    let resp: ApiResponse<TokenResponseSM> = new ApiResponse<TokenResponseSM>();
    let loginUserDetails: LoginUserSM = {
      roleType: RoleTypeSM.Unknown,
      loginId: req.username,
      firstName: 'Test First',
      middleName: 'Test Middle',
      lastName: 'Test Last',
      emailId: 'Test@test.test',
      isEmailConfirmed: false,
      passwordHash: '',
      phoneNumber: '',
      profilePicturePath: '',
      isPhoneNumberConfirmed: false,
      dateOfBirth: new Date('01-12-2000'),
      id: 1,
      createdBy: '',
      lastModifiedBy: '',
      createdOnUTC: new Date(),
      loginStatus: LoginStatusSM.Enabled,
      lastModifiedOnUTC: new Date(),
    };
    let tokenresp: TokenResponseSM = {
      accessToken: 'thisistestaccesstoken',
      expiresUtc: new Date(),
      loginUserDetails: loginUserDetails,
      clientCompanyId: 1,
      message: '',
    };

    resp.axiosResponse = {};
    resp.isError = false;
    resp.responseStatusCode = 200;
    resp.successData = tokenresp;
    return resp;
  }

  async logoutUser() {
    try {
      this.storageService.removeFromStorage(
        AppConstants.DATABASE_KEYS.ACCESS_TOKEN
      );
      this.storageService.removeFromStorage(
        AppConstants.DATABASE_KEYS.LOGIN_DETAILS
      );

      // this.storageService.removeFromStorage(
      //   AppConstants.DATABASE_KEYS.REMEMBER_PWD
      // );
      ///indexdb
      await this.storageService.removeFromStorage(
        AppConstants.DATABASE_KEYS.ACCESS_TOKEN
      );
      this.storageService.removeFromStorage(
        AppConstants.DATABASE_KEYS.LOGIN_DETAILS
      );

      // this.storageService.removeFromStorage(
      //   AppConstants.DATABASE_KEYS.REMEMBER_PWD
      // );
    } catch (error) {
      this.storageService.clearStorage();
      this.storageService.clearStorage();
    }
    this.router.navigate(['/login']);
  }

  /**********************************************************************************************signup */

  async Register(
    register: ClientUserSM
  ): Promise<ApiResponse<BoolResponseRoot>> {
    /**
     * Signs up a new user and sends a confirmation email to the provided email address.
     * @param register - An object containing the user's registration details, including their name, email address, password, and company code.
     * @returns A Promise that resolves to an `ApiResponse<SignUpSM>`. The response contains the status of the sign-up process and any additional data returned by the backend.
     * @throws Will throw an error if the `signUp` object is null or if any of its required fields are missing or invalid.
     */
    if (register == null) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<ClientUserSM>();
      apiRequest.reqData = register;
      let resp = await this.accountClient.Register(apiRequest);
      if (resp.isError) {
        throw new SampleErrorLogModel({
          message: 'Error from api in Register',
          displayMessage: resp.errorData?.displayMessage,
          apiErrorType: resp.errorData?.apiErrorType,
          additionalProps: resp.errorData?.additionalProps,
          name: 'Error in register',
        });
      }
      return resp;
    }
  }

  async VerifyEmail(
    verifyEmail: VerifyEmailRequestSM
  ): Promise<ApiResponse<VerifyEmailRequestSM>> {
    /**
     * Verifies the user's email address by sending a verification link to the registered email address.
     * @param verifyEmail - An object containing the user's login ID (userName) and the verification token (verificationToken).
     * @returns A Promise that resolves to an `ApiResponse<VerifyEmailRequestSM>`. The response contains the status of the verification process and any additional data returned by the backend.
     * @throws Will throw an error if the `verifyEmail.userName` or `verifyEmail.verificationToken` is null or undefined.
     */
    if (verifyEmail == null) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<VerifyEmailRequestSM>();
      apiRequest.reqData = verifyEmail;
      let resp = await this.accountClient.VerifyEmail(apiRequest);
      if (resp.isError) {
        throw new SampleErrorLogModel({
          message: 'Error from api in VerifyEmail',
          displayMessage: resp.errorData?.displayMessage,
          apiErrorType: resp.errorData?.apiErrorType,
          additionalProps: resp.errorData?.additionalProps,
          name: 'Error in VerifyEmail',
        });
      }
      return resp;
    }
  }

  async resetPassword(
    resetPasswordRequestSM: ResetPasswordRequestSM
  ): Promise<ApiResponse<ResetPasswordRequestSM>> {
    /**
     * Resets the password for the user with the given reset password request.
     * @param resetPasswordRequestSM - An object containing the user's login ID (loginId), the new password (newPassword), and the verification token (verificationToken).
     * @returns A Promise that resolves to an `ApiResponse<ResetPasswordRequestSM>`. The response contains the status of the password reset process and any additional data returned by the backend.
     * @throws Will throw an error if the `resetPasswordRequestSM.loginId`, `resetPasswordRequestSM.newPassword`, or `resetPasswordRequestSM.verificationToken` is null or undefined.
     */
    if (resetPasswordRequestSM == null) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<ResetPasswordRequestSM>();
      apiRequest.reqData = resetPasswordRequestSM;
      let resp = await this.accountClient.ResetPassword(apiRequest);
      if (resp.isError) {
        throw new SampleErrorLogModel({
          message: 'Error from api in ResetPassword',
          displayMessage: resp.errorData?.displayMessage,
          apiErrorType: resp.errorData?.apiErrorType,
          additionalProps: resp.errorData?.additionalProps,
          name: 'Error in ResetPassword',
        });
      }
      return resp;
    }
  }

  async forgotPassword(
    forgotPassword: ForgotPasswordSM
  ): Promise<ApiResponse<IntResponseRoot>> {
    /**
     *
     *    * Sends a password reset link to the user's registered email address.
     *
     * @remarks
     * This function is used to initiate the password reset process for a user.
     * It takes a `ForgotPasswordSM` object as a parameter, which contains the user's login ID (userName).
     * The function validates the input, creates an API request, and sends it to the backend service.
     * If the request is successful, the backend sends a password reset link to the user's email address.
     *
     * @param forgotPassword - An object containing the user's login ID (userName).
     * @returns A Promise that resolves to an `ApiResponse<IntResponseRoot>`.
     * The `IntResponseRoot` object contains the response status and any additional data returned by the backend.
     *
     * @throws Will throw an error if the `forgotPassword.userName` is null or undefined.
     */
    if (forgotPassword.userName == null) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<ForgotPasswordSM>();
      apiRequest.reqData = forgotPassword;
      let resp = await this.accountClient.ForgotPassword(apiRequest);
      if (resp.isError) {
        throw new SampleErrorLogModel({
          message: 'Error from api in ForgotPassword',
          displayMessage: resp.errorData?.displayMessage,
          apiErrorType: resp.errorData?.apiErrorType,
          additionalProps: resp.errorData?.additionalProps,
          name: 'Error in ForgotPassword',
        });
      }
      return resp;
    }
  }
}
