import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ColumnActionInterface } from './column-action.interface';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {
  @Input() sortable = false;
  @Input() defaultSorting = false;
  @Input() title: string;
  @Input() icon: string;
  @Input() property: string;
  @Input() type = 'string';
  @Input() viewValue = true;
  @Input() width: string;
  @Input() minWidth: string;
  @Input() iconColumn: (value: any) => string = null;
  @Input() transformation: (value: any) => string;
  @Input() imageUrl: (value: any) => string;
  @Input() linkable = false;
  @Input() styleColumn: string | ((value: any) => string) = null;
  @Input() actions: ColumnActionInterface[];
  @Output() clicked = new EventEmitter<any>();

  applyStyleColumn(element: any): string {
    if (!this.styleColumn) {
      return '';
    } else if (typeof(this.styleColumn) === 'string') {
      return this.styleColumn as string;
    } else {
      return this.styleColumn(element);
    }
  }
}
