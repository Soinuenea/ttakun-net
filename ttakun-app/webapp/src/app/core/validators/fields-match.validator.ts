import { AbstractControl, ValidatorFn } from '@angular/forms';

export const fieldsMatch = (fieldName: string): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    const fieldValue = control.root && control.root.value ? control.root.value[fieldName] : null;
    const controlValue = control.value;

    return (fieldValue === controlValue) ?  null : { match: true };
  };
};
