import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent {
  @Input() title: string;
  @Input() class: string;
  @Input() backLink: string | string[];
  @Input() actionLabel = 'shared.subHeader.add';
  @Input() actionLink: string | string[];
  @Input() actionClick: false;
  @Output() actionOutput = new EventEmitter<string>();
}
