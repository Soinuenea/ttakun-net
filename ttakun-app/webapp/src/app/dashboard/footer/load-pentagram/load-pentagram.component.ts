import { Component, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Penta } from 'src/app/core/models/penta';
import { EditionModalComponent } from 'src/app/shared/components/modals/edition-modal/edition-modal.component';
import { PentagramService } from '../../pentagram.service';

@Component({
  selector: 'app-load-pentagram',
  templateUrl: './load-pentagram.component.html',
  styleUrls: ['./load-pentagram.component.css']
})
export class LoadPentagramComponent implements OnDestroy {
  pentagrams: Penta[];
  @Output() save = new EventEmitter<any>();
  @ViewChild(EditionModalComponent) modal: EditionModalComponent<void>;

  private subscription: Subscription;

  constructor(
    private pentagramService: PentagramService
  ) { }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  open() {
    this.subscription = this.pentagramService.resolvePentagrams()
      .subscribe((pentas: Penta[]) => {
        this.pentagrams = pentas;
        this.modal.open();
      });
  }

  close() {
    this.modal.close();
  }

}
