import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';
import { ToasterService } from '../visual/toaster.service';

const DEFAULT_ERROR_PREFIX = 'error';

const existsFieldErrors = (errors: any): boolean => !!errors && !!errors.fields;
const existsGlobalError = (errors: any): boolean => !!errors && !!errors.global;

const removeFieldErrors = (form: FormGroup): void => {
  const controls = form.controls;
  Object.keys(controls).forEach(
    (key: string) => {
      const control = controls[key];
      if (control instanceof FormGroup) {
        removeFieldErrors(control);
      } else {
        control.setErrors(null);
      }
    }
  );
};

@Injectable()
export class ValidationService {

  constructor(
    private toasterService: ToasterService,
    private translateService: TranslateService
  ) { }

  showGlobalError(errors: any, prefix = DEFAULT_ERROR_PREFIX) {
    if (existsGlobalError(errors)) {
      const errorMessage = `${prefix}.${errors.global.code.toLowerCase()}`;
      this.toasterService.showErrorTranslating(errorMessage, errors.global.values);
    } else if (!existsFieldErrors(errors)) {
      this.showUnrecognizedError(prefix);
    }
  }

  showFieldErrors(errors: any, form: FormGroup, formMapping: any, prefix = DEFAULT_ERROR_PREFIX) {
    if (!form) {
      return;
    }
    removeFieldErrors(form);
    if (errors && !this.assignErrorsToFields(errors, form, formMapping, prefix)) {
      this.showUnrecognizedError(prefix);
    }
  }

  manageHttpResponseErrors = (data: any, prefix = DEFAULT_ERROR_PREFIX) => {
    this.showGlobalError(data.errors, prefix || DEFAULT_ERROR_PREFIX);

    return throwError((data.errors) ? data.errors.fields : null);
  };

  showFirstFieldError(errors: { [key: string]: any }, prefix = DEFAULT_ERROR_PREFIX) {
    for (const [__, error] of Object.entries(errors)) {
      const key = `${prefix}.${error.code}`;
      if (key) {
        this.toasterService.showErrorTranslating(key.toLowerCase());
        return;
      }
    }
  }

  showUnrecognizedError = (prefix: string = DEFAULT_ERROR_PREFIX) => {
    const unrecognizedError = `${prefix}.unrecognized_error`;
    this.toasterService.showErrorTranslating(unrecognizedError);
  };

  private assignErrorsToFields(errors: any, form: FormGroup, formMapping: any, prefix: string): boolean {
    let existAllFields = true;
    Object.keys(errors).forEach(
      (key: string) => {
        if (formMapping.hasOwnProperty(key)) {
          const formField = form.get(formMapping[key]);
          this.assignErrorToField(formField, errors[key], prefix);
        } else {
          existAllFields = false;
        }
      }
    );

    return existAllFields;
  }

  private async assignErrorToField(field: AbstractControl, error: any, prefix: string) {
    const errorKey = `${prefix}.${error.code.toLowerCase()}`;

    const translation = await this.translateService.get(errorKey).toPromise();
    field.setErrors({ custom: translation });
    field.markAsTouched();
  }
}
