import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AddPlankInterface } from 'src/app/core/models/add-plank.interface';
import { getCurrentYear } from 'src/app/core/utils/date.utils';
import { MUSICIAN_LIMIT, PLANK_LIMIT } from '../../core/config/constants';
import { Musician, Pentagram, Plank, PlankSound } from '../../core/models/pentagram';
import { CollapseService } from '../../core/services/visual/collapse.service';
import { hasAdminRole } from '../../core/utils/jwt.utils';
import { isEmpty } from '../../core/utils/object.utils';
import { PentagramService } from '../pentagram.service';
import { SidebarAddMusicianComponent } from './sidebar-add-musician/sidebar-add-musician.component';
import { SidebarAddPlankComponent } from './sidebar-add-plank/sidebar-add-plank.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentYear: number;
  currentPentagram: Pentagram;
  hasReachMusicianLimit = false;
  hasReachPlankLimit = false;

  @ViewChild(SidebarAddPlankComponent) addPlankModal: SidebarAddPlankComponent;
  @ViewChild(SidebarAddMusicianComponent) addMusicianModal: SidebarAddMusicianComponent;

  constructor(
    public collapseService: CollapseService,
    private pentagramService: PentagramService,
  ) { }

  ngOnInit() {
    this.currentYear = getCurrentYear();
    this.subscribeToCurrentPentagram();
  }

  /* Suscriptions */

  subscribeToCurrentPentagram() {
    this.pentagramService.currentPentagram.subscribe(pentagram => {
      this.currentPentagram = pentagram;
      this.hasReachMusicianLimit = pentagram.musicians.length === MUSICIAN_LIMIT;
      this.hasReachPlankLimit = pentagram.planks.length === PLANK_LIMIT;
    });
  }

  isAdmin() {
    return hasAdminRole();
  }

  openAddPlankModal() {
    this.addPlankModal.open();
  }

  openAddMusicianModal() {
    this.addMusicianModal.open();
  }

  onAddPlank(data: AddPlankInterface, modal: SidebarAddPlankComponent) {
    const planks = [...this.currentPentagram.planks];
    const newPlankId = isEmpty(planks) ? 0 : Math.max(...planks.map(p => p.id));
    const newPlank = new Plank(newPlankId + 1, data.color, new PlankSound(data.type, data.note));
    this.currentPentagram.planks.push(newPlank);
    this.pentagramService.updateCurrentPentagram(this.currentPentagram);
    modal.close();
  }

  onAddMusician(data: any, modal: SidebarAddMusicianComponent) {
    const musicians = [...this.currentPentagram.musicians];
    const newMusicianId = isEmpty(musicians) ? 0 : Math.max(...musicians.map(m => m.id));
    const newMusician = new Musician(newMusicianId + 1);
    newMusician.color = data?.color;
    this.currentPentagram.musicians.push(newMusician);
    this.pentagramService.updateCurrentPentagram(this.currentPentagram);
    modal.close();
  }

  dropMusician(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.currentPentagram.musicians, event.previousIndex, event.currentIndex);
    this.pentagramService.updateCurrentPentagram(this.currentPentagram);
    this.pentagramService.updateSelectedMusicianIndex(event.currentIndex);
  }

  dropPlank(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.currentPentagram.planks, event.previousIndex, event.currentIndex);
    this.pentagramService.updateCurrentPentagram(this.currentPentagram);
    this.pentagramService.updateSelectedMusicianIndex(event.currentIndex);
  }

}
