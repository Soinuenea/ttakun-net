import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-text-field',
  templateUrl: './input-text-field.component.html',
  styleUrls: ['./input-text-field.component.css']
})
export class InputTextFieldComponent {
  @Input() id: string;
  @Input() controlName: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() class = 'field';
  @Input() minlength: number;
  @Input() maxlength: number;
  @Input() hideErrors = false;
  @Input() hideLabel = false;
  @Input() readonly = false;
}
