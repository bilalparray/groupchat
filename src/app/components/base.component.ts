import { NgForm, NgModel } from "@angular/forms";
import { CommonService } from "../services/common.service";
import { LogHandlerService } from "../services/log-handler.service";
import { InputControlInformation } from "../models/internal/common-models";
import { PaginationViewModel } from "../models/internal/pagination.viewmodel";


export class BaseComponent<T>   {
    protected _commonService: CommonService;
    protected _exceptionHandler: LogHandlerService;
    viewModel!: T;
    constructor(commonService: CommonService, exceptionHandler: LogHandlerService) {
        this._commonService = commonService;
        this._exceptionHandler = exceptionHandler;
    }

    async loadPageData() {
    }

    getValidationClass(model: NgModel, control: InputControlInformation): string {
        let inputClass = ''
        control.hasError = false;
        if (control && control.validations) {
            control.validations.forEach((validation: any) => {
                if (model.touched) {
                    if (!model.errors)
                        inputClass = 'valid-input';
                    if (model.hasError(validation.type)) {
                        inputClass = 'invalid-input';
                        control.errorMessage = validation.message;
                        control.hasError = true;
                        return;
                    }
                }
            });
        }
        return inputClass;
    }

    markAllControlsAsTouched(form: NgForm) {
        let focusDone = false;
        Object.keys(form.controls).forEach((controlName) => {
            let control = form.form.get(controlName);
            control?.markAsTouched();
            if (control?.errors && !focusDone) {
                let controlElementbyName = document.querySelector(`[name="${controlName}"]`) as HTMLInputElement;
                let controlElementById = document.querySelector(`[id="${controlName}"]`) as HTMLInputElement;
                if (controlElementbyName) {
                    controlElementbyName.focus();
                    focusDone = true;
                }
                else if (controlElementById) {
                    controlElementById.focus();
                    focusDone = true;
                }
            }
        });
    }



    /**
 * Returns the array of page numbers for input
 * @param paginationModel Paginationmodel with pagesize and total count
 */
    getPagesCountArray(paginationModel: PaginationViewModel): number[] {
        let totalPages = Math.ceil(paginationModel.totalCount / paginationModel.PageSize);
        return Array.from(new Array(totalPages), (x, i) => i + 1);

    }
}