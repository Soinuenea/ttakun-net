import { AbstractControl } from '@angular/forms';

export abstract class AbstractEditionModalForm<T> {
  form: AbstractControl;

  abstract updateForm(model?: T, ...params);

  abstract getFormData(): any;

  clean() {
    return;
  }
}
