import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgxSmartModalComponent } from 'ngx-smart-modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  @Input() title: string;
  @Input() message: string;
  @Input() messageParams = {};
  @Input() confirmLabel = 'shared.confirm.confirm';
  @Input() cancelLabel = 'shared.confirm.cancel';
  @Input() hideHeader = false;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @ViewChild(NgxSmartModalComponent) modal: NgxSmartModalComponent;

  open() {
    this.modal.open();
  }

  onClose() {
    this.cancel.emit();
  }

  onCancel() {
    this.closeModal();
    this.onClose();
  }

  onConfirm() {
    this.closeModal();
    this.confirm.emit();
  }

  private closeModal() {
    this.modal.close();

  }
}
