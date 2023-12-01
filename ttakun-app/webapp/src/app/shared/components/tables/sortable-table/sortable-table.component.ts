import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { PAGE_ELEMENTS } from '../../../../core/config/constants';
import { SortInterface } from '../../sort-control/sort.interface';
import { ColumnComponent } from './column/column.component';

@Component({
  selector: 'app-sortable-table',
  templateUrl: './sortable-table.component.html',
  styleUrls: ['./sortable-table.component.css']
})
export class SortableTableComponent implements OnChanges {
  @Input() elements: any[];
  @Input() total: number;
  @Input() page: number;
  @Input() elementsPerPage: number = PAGE_ELEMENTS;
  @Input() mainColumnIndex = 0;
  @Input() selectedOrder: SortInterface;
  @Input() rowClass: (value) => string = null;
  @Input() disableSorting = false;
  @Input() hidePagination = false;
  @Output() pageChange = new EventEmitter<number>();
  @Output() sort = new EventEmitter<SortInterface>();
  @ContentChildren(ColumnComponent) columns: QueryList<ColumnComponent>;
  @ViewChild(PerfectScrollbarDirective) content: PerfectScrollbarDirective;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['elements'] && this.content) {
      this.content.scrollToTop();
    }
    if (changes['elements'] && this.elements && !this.elements.length && this.total) {
      this.pageChange.emit(1);
    }
  }

  getRowClass(row: any) {
    return (this.rowClass) ? this.rowClass(row) : '';
  }

  updateColumns(columns: QueryList<ColumnComponent>) {
    this.columns = columns;
  }

  get pagination(): PaginationInstance {
    return { currentPage: this.page, itemsPerPage: this.elementsPerPage, totalItems: this.total };
  }

}
