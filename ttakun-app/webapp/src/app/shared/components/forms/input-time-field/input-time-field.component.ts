import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-time-field',
  templateUrl: './input-time-field.component.html',
  styleUrls: ['./input-time-field.component.css']
})
export class InputTimeFieldComponent {
  @Input() id: string;
  @Input() controlName: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() class = 'field';
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() hideErrors = false;
  @Input() readonly = false;
}
