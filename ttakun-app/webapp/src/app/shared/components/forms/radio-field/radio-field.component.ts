import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { hasRequiredField } from 'src/app/core/utils/form.utils';
import { RadioOptionInterface } from './radio-option.interface';

@Component({
  selector: 'app-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.css']
})
export class RadioFieldComponent {
  @Input() id: string;
  @Input() controlName: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() options: RadioOptionInterface[];
  @Input() hideLabel = false;
  @Input() hideErrors = false;
  @Output() changeEvent = new EventEmitter<any>();
  @ViewChild('error') error;

  hasRequiredField(control: AbstractControl) {
    return hasRequiredField(control);
  }
}
