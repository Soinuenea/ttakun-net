import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/shared/components/modals/confirm-modal/confirm-modal.component';
import { PentagramService } from '../pentagram.service';

@Component({
  selector: 'app-exit-modal',
  templateUrl: './exit-modal.component.html',
  styleUrls: ['./exit-modal.component.css']
})
export class ExitModalComponent {

  subject = new Subject<boolean>();

  @Output() cancel = new EventEmitter<any>();
  @Output() confirm = new EventEmitter<any>();
  @ViewChild(ConfirmModalComponent) modal: ConfirmModalComponent;

  constructor(
    public pentagramService: PentagramService,
  ) { }

  open() {
    this.modal.open();
  }

  hasUnsavedData() {
    return this.pentagramService.hasUnsavedData.value;
  }

}
