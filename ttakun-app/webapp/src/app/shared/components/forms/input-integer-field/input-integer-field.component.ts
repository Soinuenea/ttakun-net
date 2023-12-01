import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-integer-field',
  templateUrl: './input-integer-field.component.html',
  styleUrls: ['./input-integer-field.component.css']
})
export class InputIntegerFieldComponent {
  @Input() id: string;
  @Input() controlName: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() class = 'field';
  @Input() min = 0;
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() hideErrors = false;
  @Input() readonly = false;
}
