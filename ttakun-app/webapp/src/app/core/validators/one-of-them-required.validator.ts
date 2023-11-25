import { AbstractControl, ValidatorFn } from '@angular/forms';

export const oneOfThemRequired = (fieldsToCheck: string[]): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    const value = control.value;
    const valid = fieldsToCheck.reduce((atLeastOneFullFilled: boolean, field: string) => atLeastOneFullFilled || !!value[field], false);

    return (valid)  ?  null : { match: true };
  };
};
