import { Component, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { hasRequiredField } from 'src/app/core/utils/form.utils';
import { OptionInterface } from '../../../../core/models/option.interface';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.css']
})
export class SelectFieldComponent {
  @Input() id: string;
  @Input() controlName: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() options: OptionInterface[];
  @Input() class = 'field field--select';
  @Input() empty = false;
  @Input() hideLabel = false;
  @Input() hideErrors = false;
  @ViewChild('error') error;

  hasRequiredField(control: AbstractControl) {
    return hasRequiredField(control);
  }
}
