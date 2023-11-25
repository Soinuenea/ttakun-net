import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-password-field',
  templateUrl: './input-password-field.component.html',
  styleUrls: ['./input-password-field.component.css']
})
export class InputPasswordFieldComponent {
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
}
