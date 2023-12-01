import { Component, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { hasRequiredField } from '../../../../core/utils/form.utils';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})

export class InputFieldComponent {
  @Input() type: string;
  @Input() id: string;
  @Input() controlName: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() class = 'field';
  @Input() min = 0;
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() isInteger = false;
  @Input() hideLabel = false;
  @Input() hideErrors = false;
  @Input() readonly = false;
  @Input() dataIcon = null;
  @ViewChild('error') error;

  hasRequiredField(control: AbstractControl) {
    return hasRequiredField(control);
  }
}
