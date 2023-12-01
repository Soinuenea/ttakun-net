import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { EditionModalComponent } from 'src/app/shared/components/modals/edition-modal/edition-modal.component';

@Component({
  selector: 'app-save-pentagram',
  templateUrl: './save-pentagram.component.html',
  styleUrls: ['./save-pentagram.component.css']
})
export class SavePentagramComponent {
  @Output() save = new EventEmitter<any>();
  @ViewChild(EditionModalComponent) modal: EditionModalComponent<void>;

  constructor() { }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }
}
