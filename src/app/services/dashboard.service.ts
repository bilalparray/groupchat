import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { DummyTeacherClient } from '../clients/dummy-teacher.client';
import { BaseService } from './base.service';
import { DummyTeacherViewModel } from '../models/view/end-user/dummy-teacher.viewmodel';
import { ApiRequest } from '../models/service/foundation/api-contracts/base/api-request';
import { ApiResponse } from '../models/service/foundation/api-contracts/base/api-response';
import { DeleteResponseRoot } from '../models/service/foundation/common-response/delete-response-root';
import { IntResponseRoot } from '../models/service/foundation/common-response/int-response-root';
import { DummyTeacherSM } from '../models/service/app/v1/dummy-teacher-s-m';
import { SampleErrorLogModel } from '../models/internal/sample-error-model';
import { DashboardClient } from '../clients/dashboard.client';
import { GenerateGuestKeyRequest } from '../models/service/app/v1/generate-guest-key-request-sm';
import { GuestKeyResponse } from '../models/service/app/v1/generate-guest-key-response-sm';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends BaseService {
  constructor(private dashboardClient: DashboardClient) {
    super();
  }

  async GenerateGuestKey(
    department: GenerateGuestKeyRequest
  ): Promise<ApiResponse<GuestKeyResponse>> {
    let apiRequest = new ApiRequest<GenerateGuestKeyRequest>();
    apiRequest.reqData = department;
    let resp = await this.dashboardClient.GenerateGuestKey(apiRequest);
    if (resp.isError) {
      throw new SampleErrorLogModel({
        message: 'Error from api in GetDummyTeachersCount',
        displayMessage: resp.errorData?.displayMessage,
        apiErrorType: resp.errorData?.apiErrorType,
        additionalProps: resp.errorData?.additionalProps,
        name: 'Error in GetDummyTeachersCount',
      });
    }
    return resp;
  }
}
