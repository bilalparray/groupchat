import { Injectable } from "@angular/core";
import { AppConstants } from "../app-constants";
import { StorageService } from "../services/storage.service";
import { BaseApiClient } from "./base-client/base-api.client";
import { CommonResponseCodeHandler } from "./helpers/common-response-code-handler.helper";
import { StorageCache } from "./helpers/storage-cache.helper";
import { DummyTeacherSM } from "../models/service/app/v1/dummy-teacher-s-m";
import { ApiRequest } from "../models/service/foundation/api-contracts/base/api-request";
import { ApiResponse } from "../models/service/foundation/api-contracts/base/api-response";
import { QueryFilter } from "../models/service/foundation/api-contracts/query-filter";
import { DeleteResponseRoot } from "../models/service/foundation/common-response/delete-response-root";
import { IntResponseRoot } from "../models/service/foundation/common-response/int-response-root";

@Injectable({
  providedIn: "root",
})
export class DummyTeacherClient extends BaseApiClient {
  constructor(
    storageService: StorageService,
    storageCache: StorageCache,
    commonResponseCodeHandler: CommonResponseCodeHandler
  ) {
    super(
      storageService,
      storageCache,
      commonResponseCodeHandler
    );
  }
  /** Get teachers based on OData query */
  GetDummyTeachersByOdata = async (
    queryFilter: QueryFilter
  ): Promise<ApiResponse<DummyTeacherSM[]>> => {
    const baseUrl = `${AppConstants.API_ENDPOINTS.DUMMY_TEACHER_URL}/odata`;
    const finalUrl = this.ApplyQueryFilterToUrl(baseUrl, queryFilter);
    let resp = await this.GetResponseAsync<number, DummyTeacherSM[]>(
      finalUrl,
      "GET"
    );
    return resp;
  };

  /**Get all teachers */
  GetAllDummyTeachers = async (): Promise<ApiResponse<DummyTeacherSM[]>> => {
    let resp = await this.GetResponseAsync<number, DummyTeacherSM[]>(
      `${AppConstants.API_ENDPOINTS.DUMMY_TEACHER_URL}`,
      "GET"
    );
    return resp;
  };

  /**Get teacher by id */
  GetDummyTeacherById = async (
    Id: number
  ): Promise<ApiResponse<DummyTeacherSM>> => {
    let resp = await this.GetResponseAsync<number, DummyTeacherSM>(
      `${AppConstants.API_ENDPOINTS.DUMMY_TEACHER_URL}/${Id}`,
      "GET"
    );
    return resp;
  };

  /**Add a new teacher */
  AddDummyTeacher = async (
    addTeacherRequest: ApiRequest<DummyTeacherSM>
  ): Promise<ApiResponse<DummyTeacherSM>> => {
    let resp = await this.GetResponseAsync<DummyTeacherSM, DummyTeacherSM>(
      AppConstants.API_ENDPOINTS.DUMMY_TEACHER_URL,
      "POST",
      addTeacherRequest
    );
    return resp;
  };

  /**Update Teacher*/
  UpdateDummyTeacher = async (
    updateTeacherRequest: ApiRequest<DummyTeacherSM>
  ): Promise<ApiResponse<DummyTeacherSM>> => {
    let resp = await this.GetResponseAsync<DummyTeacherSM, DummyTeacherSM>(
      `${AppConstants.API_ENDPOINTS.DUMMY_TEACHER_URL}/${updateTeacherRequest.reqData.id}`,
      "PUT",
      updateTeacherRequest
    );
    return resp;
  };

  /**delete teacher by id */
  DeleteDummyTeacherById = async (
    Id: number
  ): Promise<ApiResponse<DeleteResponseRoot>> => {
    let resp = await this.GetResponseAsync<number, DeleteResponseRoot>(
      `${AppConstants.API_ENDPOINTS.DUMMY_TEACHER_URL}/${Id}`,
      "DELETE"
    );
    return resp;
  };

  // delete all dummy teachers
  DeleteAllDummyTeachers = async (): Promise<
    ApiResponse<DeleteResponseRoot>
  > => {
    let resp = await this.GetResponseAsync<number, DeleteResponseRoot>(
      `${AppConstants.API_ENDPOINTS.DUMMY_TEACHER_URL}/all`,
      "DELETE"
    );
    return resp;
  };

  /** Get Total Count of a dummyTeachers */
  GetDummyTeachersCount = async (): Promise<ApiResponse<IntResponseRoot>> => {
    let resp = await this.GetResponseAsync<null, IntResponseRoot>(
      `${AppConstants.API_ENDPOINTS.DUMMY_TEACHER_URL}/count`,
      "GET"
    );
    return resp;
  };

  /** Get Total Count odata of a dummyTeachers */
  GetDummyTeachersOdataCount = async (
    queryFilter: QueryFilter
  ): Promise<ApiResponse<IntResponseRoot>> => {
    const baseUrl = `${AppConstants.API_ENDPOINTS.DUMMY_TEACHER_URL}/odata/count`;
    const finalUrl = this.ApplyQueryFilterToUrl(baseUrl, queryFilter);
    let resp = await this.GetResponseAsync<number, IntResponseRoot>(
      finalUrl,
      "GET"
    );
    return resp;
  };
}
