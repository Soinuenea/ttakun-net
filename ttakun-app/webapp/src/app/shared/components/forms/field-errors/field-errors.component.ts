import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.css']
})
export class FieldErrorsComponent {
  @Input() form: FormGroup;
  @Input() controlName: string;
  @Input() prefix = 'error';

  getCompleteKey(partial: string) {
    return `${ this.prefix }.${ partial }`;
  }
}
