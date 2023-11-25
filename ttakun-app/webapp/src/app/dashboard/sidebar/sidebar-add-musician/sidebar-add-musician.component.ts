import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { EditionModalComponent } from 'src/app/shared/components/modals/edition-modal/edition-modal.component';

@Component({
  selector: 'app-sidebar-add-musician',
  templateUrl: './sidebar-add-musician.component.html',
  styleUrls: ['./sidebar-add-musician.component.css']
})
export class SidebarAddMusicianComponent {

  @Output() save = new EventEmitter<any>();
  @ViewChild(EditionModalComponent) modal: EditionModalComponent<void>;

  constructor() {

  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }
}
