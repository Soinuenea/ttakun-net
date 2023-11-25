import { Component, ContentChild, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgxSmartModalComponent } from 'ngx-smart-modal';
import { AbstractEditionModalForm } from './abstract-edition-modal-form';

@Component({
  selector: 'app-edition-modal',
  templateUrl: './edition-modal.component.html',
  styleUrls: ['./edition-modal.component.css']
})
export class EditionModalComponent<T> {
  @Input() title: string;
  @Input() titleParams: { [key: string]: any };
  @Input() saveLabel = 'shared.edit.save';
  @Input() cancelLabel = 'shared.edit.cancel';
  @Input() modalClass = 'modal';
  @Input() escapable = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @ViewChild(NgxSmartModalComponent) modal: NgxSmartModalComponent;
  @ContentChild(AbstractEditionModalForm) formComponent: AbstractEditionModalForm<T>;

  open(model?: T, ...params) {
    this.formComponent.updateForm(model, ...params);
    this.modal.open();
  }

  close() {
    this.formComponent.clean();
    this.modal.close();
  }

  onCancel() {
    this.close();
    this.cancel.emit();
  }

  onSave() {
    this.save.emit(this.formComponent.getFormData());
  }

  get saveDisabled() {
    return (this.formComponent) ? this.formComponent.form.invalid : true;
  }
}
