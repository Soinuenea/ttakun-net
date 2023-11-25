import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FileInterface } from '../utils/file.interface';

const checkMimeType = (type: string, acceptedMimeTypes: string | string[]) => {
  return (Array.isArray(acceptedMimeTypes)) ? acceptedMimeTypes.includes(type) : (type === acceptedMimeTypes);
};

export const fileMimeType = (acceptedMimeTypes: string | string[]): ValidatorFn =>  {
  return (control: AbstractControl): {[key: string]: any} => {
    const file = control.value as FileInterface;

    return (!file || checkMimeType(file.type, acceptedMimeTypes)) ?  null : { mimeType: true };
  };
};
