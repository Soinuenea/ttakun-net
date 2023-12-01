import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormTableColumnComponent } from '../form-table-column/form-table-column.component';

@Component({
  selector: 'app-form-cell',
  templateUrl: './form-cell.component.html',
  styleUrls: ['./form-cell.component.css']
})
export class FormCellComponent {
  @Input() column: FormTableColumnComponent;
  @Input() element: AbstractControl;
  @Input() index: number;

  get value() {
    return (this.element && this.column && this.column.property) ? this.element.value[this.column.property] : null;
  }

  get id() {
    return (this.column && this.column.formProperty)
      ? `${ this.column.formProperty }_${ this.index }`
      : `${ this.column.property }_${ this.index }`;
  }
}
