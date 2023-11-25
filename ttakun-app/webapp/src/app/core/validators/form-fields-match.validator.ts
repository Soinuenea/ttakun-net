import { AbstractControl, ValidatorFn } from '@angular/forms';
import { allEqual, mapCollection } from '../utils/collection.utils';

export const formFieldsMatch = (fieldNames: string[], appendToField = null): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    const values = mapCollection(name => control.root.get(name).value, fieldNames);
    const areAllEqual = allEqual(values);
    const result = (areAllEqual) ?  null : { match: true };

    if (result && appendToField) {
      const appendingControl = control.root.get(appendToField);
      appendingControl.markAsTouched();
      appendingControl.setErrors(result);
    }

    return result;
  };
};
