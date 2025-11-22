import { Injectable } from "@angular/core";
import { AppConstants } from "src/app/app-constants";
import { DummyTeacherClient } from "../clients/dummy-teacher.client";
import { BaseService } from "./base.service";
import { DummyTeacherViewModel } from "../models/view/end-user/dummy-teacher.viewmodel";
import { ApiRequest } from "../models/service/foundation/api-contracts/base/api-request";
import { ApiResponse } from "../models/service/foundation/api-contracts/base/api-response";
import { DeleteResponseRoot } from "../models/service/foundation/common-response/delete-response-root";
import { IntResponseRoot } from "../models/service/foundation/common-response/int-response-root";
import { DummyTeacherSM } from "../models/service/app/v1/dummy-teacher-s-m";
import { SampleErrorLogModel } from "../models/internal/sample-error-model";

@Injectable({
  providedIn: "root",
})
export class DummyTeacherService extends BaseService {
  constructor(private dummyTeacherClient: DummyTeacherClient) {
    super();
  }

  /**
   * Gets dummy teachers by OData with pagination.
   * @param viewModel The view model containing pagination information and optional filters.
   * @returns The response containing the dummy teachers.
   */
  async GetDummyTeachersByOdata(
    viewModel: DummyTeacherViewModel
  ): Promise<ApiResponse<DummyTeacherSM[]>> {
    viewModel.queryFilter.skip =
      (viewModel.pagination.PageNo - 1) * viewModel.pagination.PageSize;
    let resp = await this.dummyTeacherClient.GetDummyTeachersByOdata(
      viewModel.queryFilter
    );

    if (resp.isError) {
      throw new SampleErrorLogModel({
        message: "Error from api in GetDummyTeachersByOdata",
        displayMessage: resp.errorData?.displayMessage,
        apiErrorType: resp.errorData?.apiErrorType,
        additionalProps: resp.errorData?.additionalProps,
        name: "Error in GetDummyTeachersByOdata",
      });
    }
    return resp;
  }

  /**
   * Retrieves all dummy teachers.
   *
   * @returns A promise that resolves to an ApiResponse containing an array of DummyTeacherSM objects.
   */

  async GetAllDummyTeachers(): Promise<ApiResponse<DummyTeacherSM[]>> {
    let resp = await this.dummyTeacherClient.GetAllDummyTeachers();
    if (resp.isError) {
      throw new SampleErrorLogModel({
        message: "Error from api in GetAllDummyTeachers",
        displayMessage: resp.errorData?.displayMessage,
        apiErrorType: resp.errorData?.apiErrorType,
        additionalProps: resp.errorData?.additionalProps,
        name: "Error in GetAllDummyTeachers",
      });
    }
    return resp;
  }

  /**
   * Retrieves a dummy teacher by its id.
   * @param id The id of the dummy teacher to retrieve.
   * @returns A promise that resolves to an ApiResponse containing a DummyTeacherSM object.
   * @throws Error if id is less than or equal to 0.
   */
  async GetDummyTeacherById(id: number): Promise<ApiResponse<DummyTeacherSM>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error);
    }
    let resp = await this.dummyTeacherClient.GetDummyTeacherById(id);
    if (resp.isError) {
      throw new SampleErrorLogModel({
        message: "Error from api in GetDummyTeacherById",
        displayMessage: resp.errorData?.displayMessage,
        apiErrorType: resp.errorData?.apiErrorType,
        additionalProps: resp.errorData?.additionalProps,
        name: "Error in GetDummyTeacherById",
      });
    }
    return resp;
  }
  /**
   * Deletes a dummy teacher by its id.
   * @param id The id of the dummy teacher to delete.
   * @returns A promise that resolves to an ApiResponse containing a DeleteResponseRoot object.
   * @throws Error if id is less than or equal to 0.
   */
  async DeleteDummyTeacher(
    id: number
  ): Promise<ApiResponse<DeleteResponseRoot>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error);
    }
    let resp = await this.dummyTeacherClient.DeleteDummyTeacherById(id);
    if (resp.isError) {
      throw new SampleErrorLogModel({
        message: "Error from api in DeleteDummyTeacherById",
        displayMessage: resp.errorData?.displayMessage,
        apiErrorType: resp.errorData?.apiErrorType,
        additionalProps: resp.errorData?.additionalProps,
        name: "Error in Delete Dummy Teacher By Id",
      });
    }
    return resp;
  }
  /**
   * Deletes all dummy teachers.
   * @returns A promise that resolves to an ApiResponse containing a DeleteResponseRoot object.
   */

  async DeleteAllDummyTeachers(): Promise<ApiResponse<DeleteResponseRoot>> {
    let resp = await this.dummyTeacherClient.DeleteAllDummyTeachers();
    if (resp.isError) {
      throw new SampleErrorLogModel({
        message: "Error from api in DeleteAllDummyTeachers",
        displayMessage: resp.errorData?.displayMessage,
        apiErrorType: resp.errorData?.apiErrorType,
        additionalProps: resp.errorData?.additionalProps,
        name: "Error in DeleteAllDummyTeachers",
      });
    }
    return resp;
  }
  /**
   * Adds a new dummy teacher.
   * @param dummyTeacher The dummy teacher to add.
   * @returns A promise that resolves to an ApiResponse containing a DummyTeacherSM object.
   * @throws Error if dummyTeacher is null.
   */
  async AddDummyTeacher(
    dummyTeacher: DummyTeacherSM
  ): Promise<ApiResponse<DummyTeacherSM>> {
    if (dummyTeacher == null) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<DummyTeacherSM>();
      apiRequest.reqData = dummyTeacher;
      let resp = await this.dummyTeacherClient.AddDummyTeacher(apiRequest);
      if (resp.isError) {
        throw new SampleErrorLogModel({
          message: "Error from api in AddDummyTeacher",
          displayMessage: resp.errorData?.displayMessage,
          apiErrorType: resp.errorData?.apiErrorType,
          additionalProps: resp.errorData?.additionalProps,
          name: "Error in AddDummyTeacher",
        });
      }
      return resp;
    }
  }

  /**
   * Updates a dummy teacher by its id.
   * @param dummyTeacher The dummy teacher to update.
   * @returns A promise that resolves to an ApiResponse containing a DummyTeacherSM object.
   * @throws Error if dummyTeacher is null.
   */
  async UpdateDummyTeacher(
    dummyTeacher: DummyTeacherSM
  ): Promise<ApiResponse<DummyTeacherSM>> {
    if (dummyTeacher == null) {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    } else {
      let apiRequest = new ApiRequest<DummyTeacherSM>();
      apiRequest.reqData = dummyTeacher;
      let resp = await this.dummyTeacherClient.UpdateDummyTeacher(apiRequest);
      if (resp.isError) {
        throw new SampleErrorLogModel({
          message: "Error from api in UpdateDummyTeacher",
          displayMessage: resp.errorData?.displayMessage,
          apiErrorType: resp.errorData?.apiErrorType,
          additionalProps: resp.errorData?.additionalProps,
          name: "Error in UpdateDummyTeacher",
        });
      }
      return resp;
    }
  }

  /**
   * Retrieves the count of dummy teachers.
   * @returns A promise that resolves to an ApiResponse containing an IntResponseRoot object with the count.
   */

  async GetDummyTeachersCount(): Promise<ApiResponse<IntResponseRoot>> {
    let resp = await this.dummyTeacherClient.GetDummyTeachersCount();
    if (resp.isError) {
      throw new SampleErrorLogModel({
        message: "Error from api in GetDummyTeachersCount",
        displayMessage: resp.errorData?.displayMessage,
        apiErrorType: resp.errorData?.apiErrorType,
        additionalProps: resp.errorData?.additionalProps,
        name: "Error in GetDummyTeachersCount",
      });
    }
    return resp;
  }

  async GetDummyTeachersOdataCount(
    viewModel: DummyTeacherViewModel
  ): Promise<ApiResponse<IntResponseRoot>> {
    const { skip, top, ...queryFilterWithoutSkipTop } = viewModel.queryFilter;

    const resp = await this.dummyTeacherClient.GetDummyTeachersOdataCount(
      queryFilterWithoutSkipTop
    );

    if (resp.isError) {
      throw new SampleErrorLogModel({
        message: "Error from api in GetDummyTeachersodataCount",
        displayMessage: resp.errorData?.displayMessage,
        apiErrorType: resp.errorData?.apiErrorType,
        additionalProps: resp.errorData?.additionalProps,
        name: "Error in GetDummyTeachersodataCount",
      });
    }

    return resp;
  }
}
