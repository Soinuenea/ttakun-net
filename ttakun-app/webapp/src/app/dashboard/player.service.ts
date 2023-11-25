import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  currentSongPoint: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentActiveLoop: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentSongPlaying: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  updateCurrentSongPoint(newPercent: number) {
    this.currentSongPoint.next(newPercent);
  }

  updateCurrentActiveLoop(isActive: boolean) {
    this.currentActiveLoop.next(isActive);
  }

  updateCurrentSongPlaying(isActive: boolean) {
    this.currentSongPlaying.next(isActive);
  }

}
