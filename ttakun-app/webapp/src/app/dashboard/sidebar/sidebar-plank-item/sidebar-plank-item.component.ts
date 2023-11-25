import { Component, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translation.service';
import { Pentagram, Plank } from '../../../core/models/pentagram';
import { PentagramService } from '../../pentagram.service';

@Component({
  selector: 'app-sidebar-plank-item',
  templateUrl: './sidebar-plank-item.component.html',
  styleUrls: ['./sidebar-plank-item.component.css']
})
export class SidebarPlankItemComponent implements OnInit {
  @Input() plank: Plank;
  @Input() itemIndex: number;
  isSelected = false;
  currentPentagram: Pentagram;


  constructor(
    private pentagramService: PentagramService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.subscribeSelectedPlankIndex();
    this.subscribeCurrentPentagram();
  }

  /* Subscriptions */

  subscribeSelectedPlankIndex() {
    this.pentagramService.selectedPlankIndex.subscribe(index => {
      this.isSelected = this.itemIndex === index;
    });
  }

  subscribeCurrentPentagram() {
    this.pentagramService.currentPentagram.subscribe(penta => {
      this.currentPentagram = penta;
    });
  }

  /* Finish subscriptions */


  changeSelectedPlankIndex() {
    this.pentagramService.updateSelectedPlankIndex(this.itemIndex);
  }

  removePlank() {
    this.currentPentagram.planks.splice(this.itemIndex, 1);
    this.currentPentagram.beats = this.currentPentagram.beats.filter(beat => beat.plank !== this.plank?.id);
    this.pentagramService.updateCurrentPentagram(this.currentPentagram);
  }

  getPlank() {
    // eslint-disable-next-line max-len
    return this.translationService.getTranslationSync('sound.abbreviation.'+ this.plank.sound.type.toLowerCase(), {note: this.plank.sound.note});
  }
}
