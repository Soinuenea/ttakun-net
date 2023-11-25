import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabInterface } from './tab.interface';

@Component({
  selector: 'app-tab-pane',
  templateUrl: './tab-pane.component.html',
  styleUrls: ['./tab-pane.component.css']
})
export class TabPaneComponent {
  @Input() leftTabs: TabInterface[];
  @Input() rightTabs: TabInterface[];
  @Input() class: string;
  @Output() selectTab = new EventEmitter<TabInterface>();
}
