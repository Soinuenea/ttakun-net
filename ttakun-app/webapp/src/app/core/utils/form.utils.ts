import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export const hasRequiredField = (abstractControl: AbstractControl): boolean => {
  const formControl = new FormControl();
  if (abstractControl.validator) {
    const validationResult: any = (abstractControl.validator as ValidatorFn)(formControl);
    return (validationResult !== null && validationResult.required === true);
  }
  return false;
};
