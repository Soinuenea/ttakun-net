import { Component, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { EditionModalComponent } from 'src/app/shared/components/modals/edition-modal/edition-modal.component';
import { PentagramService } from '../../pentagram.service';

@Component({
  selector: 'app-import-pentagram',
  templateUrl: './import-pentagram.component.html',
  styleUrls: ['./import-pentagram.component.css']
})
export class ImportPentagramComponent {
  @Output() save = new EventEmitter<any>();
  @ViewChild(EditionModalComponent) modal: EditionModalComponent<void>;

  constructor(
    private pentagramService: PentagramService
  ) { }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

}
