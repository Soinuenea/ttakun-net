import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Pentagram } from 'src/app/core/models/pentagram';
import { PentagramService } from 'src/app/dashboard/pentagram.service';

@Component({
  selector: 'app-sidebar-player-observations',
  templateUrl: './sidebar-player-observations.component.html',
  styleUrls: ['./sidebar-player-observations.component.css']
})
export class SidebarPlayerObservationsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  currentPentagram: Pentagram;
  editMode = false;
  @ViewChild('observations') observations: ElementRef;

  private subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private pentagramService: PentagramService,
  ) { }

  ngOnInit(): void {
    this.subscribeCurrentPentagram();
    this.createForm();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /* Subscriptions */
  subscribeCurrentPentagram() {
    this.subscription = this.pentagramService.currentPentagram.subscribe(penta => {
      this.currentPentagram = penta;
    });
  }
  /* Finish subscriptions */

  private createForm() {
    this.form = this.fb.group({
      observations: this.currentPentagram?.observations || '',
    });
    this.updateForm();
  }

  updateForm() {
    if (!this.form) {
      return;
    }
    const value = {
      observations: this.currentPentagram?.observations || '',
    };
    this.form.reset(value);
  }

  onOpenEdit() {
    this.editMode = true;
    // this.observations.nativeElement.focus();
  }

  onCloseEdit() {
    this.editMode = false;
    this.currentPentagram.observations = this.form.get('observations').value;
    this.pentagramService.updateCurrentPentagram(this.currentPentagram);
  }

}
