import { Component, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sound } from 'src/app/core/models/sound';
import { SoundOptions } from 'src/app/core/models/sound-options';
import { SoundType } from 'src/app/core/models/sound-type';
import { EditionModalComponent } from 'src/app/shared/components/modals/edition-modal/edition-modal.component';
import { SidebarSoundService } from '../sidebar-sound.service';

@Component({
  selector: 'app-sidebar-add-plank',
  templateUrl: './sidebar-add-plank.component.html',
  styleUrls: ['./sidebar-add-plank.component.css']
})
export class SidebarAddPlankComponent implements OnDestroy {

  soundTypes: SoundType[];
  sounds: Sound[];
  @Output() save = new EventEmitter<any>();
  @ViewChild(EditionModalComponent) modal: EditionModalComponent<void>;

  private subscription: Subscription;

  constructor(
    private sidebarSoundService: SidebarSoundService,
  ) { }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  open() {
    this.subscription = this.sidebarSoundService.getSounds()
      .subscribe((soundOptions: SoundOptions) => {
        this.soundTypes = soundOptions.soundTypes;
        this.sounds = soundOptions.sounds;
      });

    this.modal.open();
  }

  close() {
    this.modal.close();
  }

}
