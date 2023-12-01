import { Component, ContentChildren, Input, OnChanges, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray } from '@angular/forms';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { FormTableColumnComponent } from './form-table-column/form-table-column.component';

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.css']
})
export class FormTableComponent implements OnChanges {
  @Input() elements: FormArray;
  @Input() mainColumnIndex = 0;
  @Input() rowClass: (value) => string = null;
  @ContentChildren(FormTableColumnComponent) columns: QueryList<FormTableColumnComponent>;
  @ViewChild(PerfectScrollbarDirective) content: PerfectScrollbarDirective;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.elements) {
      this.content.scrollToTop();
    }
  }

  getRowClass(row: any) {
    return (this.rowClass) ? this.rowClass(row) : '';
  }
}
