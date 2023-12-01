import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgxSmartModalComponent } from 'ngx-smart-modal';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent {
  @Input() title: string;
  @Input() titleParams: { [key: string]: any };
  @Input() message: string;
  @Input() messageParams = [];
  @Input() acceptLabel = 'shared.info.accept';
  @Input() hideHeaderIcon = false;
  @Input() modalClass = 'modal--confirmation';
  @Input() closeOnOutsideClick = true;
  @ViewChild(NgxSmartModalComponent) modal: NgxSmartModalComponent;
  @ContentChild(ElementRef) content: ElementRef;
  @Output() accept = new EventEmitter();

  open() {
    this.modal.open();
  }

  onAccept() {
    this.accept.emit();
    this.modal.close();
  }
}
