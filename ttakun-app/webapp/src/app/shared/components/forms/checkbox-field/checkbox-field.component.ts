import { Component, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { hasRequiredField } from 'src/app/core/utils/form.utils';

@Component({
  selector: 'app-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.css']
})
export class CheckboxFieldComponent {
  @Input() id: string;
  @Input() controlName: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() hideErrors = false;
  @ViewChild('error') error;

  hasRequiredField(control: AbstractControl) {
    return hasRequiredField(control);
  }
}
