import { AbstractControl, ValidatorFn } from '@angular/forms';

export const fieldLessThan = (fieldName: string, compareToField): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    const fieldControl = control.root.get(fieldName);
    const comparingControl = control.root.get(compareToField);

    if (fieldControl && comparingControl) {
      const error = (fieldControl.value >= comparingControl.value) ? null : { lessThan: true };
      fieldControl.setErrors(error);

      return error;
    }

    return null;
  };
};
