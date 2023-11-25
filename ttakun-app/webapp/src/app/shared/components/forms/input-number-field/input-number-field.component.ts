import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-number-field',
  templateUrl: './input-number-field.component.html',
  styleUrls: ['./input-number-field.component.css']
})
export class InputNumberFieldComponent {
  @Input() id: string;
  @Input() controlName: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() class = 'field';
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() hideLabel = false;
  @Input() hideErrors = false;
  @Input() readonly = false;
  @Input() dataIcon = null;
}
