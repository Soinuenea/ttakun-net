import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionInterface } from '../../../../../core/models/option.interface';

enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  INTEGER = 'integer'
}

@Component({
  selector: 'app-form-table-column',
  templateUrl: './form-table-column.component.html',
  styleUrls: ['./form-table-column.component.css']
})
export class FormTableColumnComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() property: string;
  @Input() formProperty: string;
  @Input() type: string;
  @Input() options: OptionInterface[];
  @Input() width: string;
  @Input() minWidth: string;
  @Input() iconColumn: (value: any) => string = null;
  @Input() transformation: (value: any) => string;
  @Input() styleColumn: (value: any) => string = null;
  @Input() linkable = false;
  @Input() hideErrors = false;
  @Output() clicked = new EventEmitter<any>();

  get isText() {
    return this.type === FieldType.TEXT;
  }

  get isNumber() {
    return this.type === FieldType.NUMBER;
  }

  get isCheckbox() {
    return this.type === FieldType.CHECKBOX;
  }

  get isSelect() {
    return this.type === FieldType.SELECT;
  }

  get isInteger() {
    return this.type === FieldType.INTEGER;
  }
}
