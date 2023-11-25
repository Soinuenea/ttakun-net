import { Component, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { hasRequiredField } from 'src/app/core/utils/form.utils';
import { getMoment } from '../../../../core/utils/date.utils';

@Component({
  selector: 'app-datepicker-field',
  templateUrl: './datepicker-field.component.html',
  styleUrls: ['./datepicker-field.component.css']
})
export class DatepickerFieldComponent {
  @Input() id: string;
  @Input() controlName: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() class = 'field';
  @Input() type: 'both' | 'calendar' | 'timer' = 'both';
  @Input() minDate: number;
  @Input() maxDate: number;
  @Input() hideIcon = false;
  @Input() hideErrors = false;
  @Input() selectMode: 'single' | 'range' | 'rangeFrom' | 'rangeTo' = 'single';
  @ViewChild('error') error;

  get min() {
    return (this.minDate) ? getMoment(this.minDate) : null;
  }

  get max() {
    return (this.maxDate) ? getMoment(this.maxDate) : null;
  }

  hasRequiredField(control: AbstractControl) {
    return hasRequiredField(control);
  }
}
