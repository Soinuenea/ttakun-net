import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortInterface } from '../../../sort-control/sort.interface';

@Component({
  selector: '[appSortableColumn]', // eslint-disable-line @angular-eslint/component-selector
  templateUrl: './sortable-column.component.html',
  styleUrls: ['./sortable-column.component.css']
})
export class SortableColumnComponent {
  @Input() sortable = false;
  @Input() defaultSorting = false;
  @Input() title: string;
  @Input() icon: string;
  @Input() property: string;
  @Input() type = 'string';
  @Input() selected: SortInterface;
  @Output() sort = new EventEmitter<SortInterface>();
}
