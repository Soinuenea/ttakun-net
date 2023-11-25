import { Component, Input } from '@angular/core';

@Component({
  selector: '[appFormColumn]', // eslint-disable-line @angular-eslint/component-selector
  templateUrl: './form-column.component.html',
  styleUrls: ['./form-column.component.css']
})
export class FormColumnComponent {
  @Input() title: string;
  @Input() icon: string;
}
