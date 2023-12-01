import { Component, Input } from '@angular/core';
import { ColumnComponent } from '../column/column.component';

@Component({
  selector: 'app-sortable-cell',
  templateUrl: './sortable-cell.component.html',
  styleUrls: ['./sortable-cell.component.css']
})
export class SortableCellComponent {
  @Input() column: ColumnComponent;
  @Input() element: any;

  get value() {
    return (this.element && this.column && this.column.property) ? this.element[this.column.property] : null;
  }
}
