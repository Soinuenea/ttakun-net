import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation.service';
import { Musician, Pentagram } from '../../../core/models/pentagram';
import { PentagramService } from '../../pentagram.service';

@Component({
  selector: 'app-sidebar-musician-item',
  templateUrl: './sidebar-musician-item.component.html',
  styleUrls: ['./sidebar-musician-item.component.css']
})
export class SidebarMusicianItemComponent implements OnInit, OnDestroy {
  @Input() musician: Musician;
  @Input() playingSide: 'bottom' | 'top';
  @Input() itemIndex: number;
  isSelected = false;
  currentPentagram: Pentagram;

  subscriptions: Subscription[] = [];

  constructor(
    private pentagramService: PentagramService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.subscribeSelectedMusicianIndex();
    this.subscribeCurrentPentagram();
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(
        (subscription: Subscription) => subscription.unsubscribe()
      );
    }
  }

  /* Subscriptions */

  subscribeSelectedMusicianIndex() {
    const selectedMusicianIndexSubscription = this.pentagramService.selectedMusicianIndex.subscribe(index => {
      this.isSelected = this.itemIndex === index;
    });
    this.subscriptions.push(selectedMusicianIndexSubscription);
  }

  subscribeCurrentPentagram() {
    const currentPentagramSubscription = this.pentagramService.currentPentagram.subscribe(penta => {
      this.currentPentagram = penta;
    });
    this.subscriptions.push(currentPentagramSubscription);
  }

  /* Finish subscriptions */


  changeSelectedMusicianIndex() {
    this.pentagramService.updateSelectedMusicianIndex(this.itemIndex);
  }

  removeMusician() {
    this.currentPentagram.musicians.splice(this.itemIndex, 1);
    this.currentPentagram.beats = this.currentPentagram.beats.filter(beat => beat.musician !== this.musician?.id);
    this.pentagramService.updateCurrentPentagram(this.currentPentagram);
    if(this.currentPentagram.musicians.length === 1){
      this.pentagramService.updateSelectedMusicianIndex(0);
    }
  }

  toggleMute(musician: Musician) {
    const musicians = [...this.currentPentagram.musicians];
    const index = musicians.findIndex((m => m.id === musician.id));
    musicians[index].mute = !musicians[index].mute;
    this.currentPentagram.musicians = musicians;
    this.pentagramService.updateCurrentPentagram(this.currentPentagram);
  }

  getMusician() {
    return this.translationService.getTranslationSync('sidebar.musicians.musician', {value : this.musician.id});
  }
}
