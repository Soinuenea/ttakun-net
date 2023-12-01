import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FileInterface } from '../utils/file.interface';

export const fileSize = (sizeInKb: number): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    const file = control.value as FileInterface;
    const size = (file) ? file.size : 0;
    const sizeInBytes = sizeInKb * 1024;
    const sizeInMb = sizeInKb / 1024;

    return (size <= sizeInBytes) ?  null : { fileSize: sizeInMb };
  };
};
