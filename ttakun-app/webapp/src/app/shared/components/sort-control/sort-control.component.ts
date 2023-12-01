import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortInterface } from './sort.interface';

@Component({
  selector: 'app-sort-control',
  templateUrl: './sort-control.component.html',
  styleUrls: ['./sort-control.component.css']
})
export class SortControlComponent implements OnInit {
  @Input() attribute: string;
  @Input() type = 'string';
  @Input() defaultSorting = false;
  @Input() selected: SortInterface;
  @Output() sort = new EventEmitter<SortInterface>();

  ngOnInit() {
    if (this.defaultSorting) {
      // Simulate async operation to avoid ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => this.onSort(false), 0);
    }
  }

  onSort(reverse: boolean) {
    this.sort.emit({ attribute: this.attribute, type: this.type, reverse });
  }

  isSelected(reverse: boolean) {
    return (this.selected && this.selected.attribute === this.attribute && this.selected.reverse === reverse);
  }
}
