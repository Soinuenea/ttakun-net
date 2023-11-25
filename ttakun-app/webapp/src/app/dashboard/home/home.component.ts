import { Component, HostListener, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SelectContainerComponent } from 'ngx-drag-to-select';
import { Subscription } from 'rxjs';
import { UndoRedoBeat } from 'src/app/core/models/undo-redo-beat';
import { Beat, Musician, Pentagram } from '../../core/models/pentagram';
import { PentagramService } from '../pentagram.service';
import { PlayerService } from '../player.service';
import { UndoRedoBeatService } from '../undo-redo-beat.service';

const addAction = 'add';
const removeAction = 'remove';

const beatUpClass = 'rectangle-top';
const beatDownClass = 'rectangle-bottom';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentPentagram: Pentagram;
  selectedPlankIndex = 0;
  selectedMusicianIndex = 0;
  currentSongPoint = 0;
  currentHitStrength: number;
  steps = [];
  stepTimeRange: number;
  times = [];
  defaultBeatHeight = 10;
  selectedBeats: any[] = [];
  copiedBeats: Beat[] = [];
  shiftPressed = false;
  currentSongPlaying = false;

  plankMargin = 80;

  beatGhost: Beat;

  subscriptions: Subscription[] = [];

  @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent;


  constructor(
    private pentagramService: PentagramService,
    private playerService: PlayerService,
    private undoRedoBeatService: UndoRedoBeatService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.subscribeCurrentPentagram();
    this.subscribeSelectedPlankIndex();
    this.subscribeSelectedMusicianIndex();
    this.subscribeCurrentSongPoint();
    this.subscribeSelectedHitStrength();
    this.subscribeCurrentUndoRedoBeat();
    this.subscribeCurrentSongPlaying();
    this.calculateStepTimeRange();
    this.initStepsAndTimes();
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(
        (subscription: Subscription) => subscription.unsubscribe()
        );
    }
  }

  initStepsAndTimes() {
    if (this.currentPentagram) {
      const rhythmicalWeight = this.currentPentagram.config.rhythmicalWeight;
      this.steps = Array(Math.round(this.currentPentagram.config.duration/rhythmicalWeight) + 1).fill(0).map((_, i) => i*rhythmicalWeight);
      this.times = Array(Math.round(this.currentPentagram.config.duration/500 + 1)).fill(0).map((_, i) => i/2);
    }
  }

  /* Init subscriptions */

  subscribeCurrentPentagram() {
    const currentPentagramSubscription = this.pentagramService.currentPentagram.subscribe(pentagram => {
      this.currentPentagram = pentagram;
      this.initStepsAndTimes();
      this.calculateStepTimeRange();
    });
    this.subscriptions.push(currentPentagramSubscription);
  }

  subscribeSelectedPlankIndex() {
    const selectedPlankIndexSubscription = this.pentagramService.selectedPlankIndex.subscribe(plankIndex => {
      this.selectedPlankIndex = plankIndex;
    });
    this.subscriptions.push(selectedPlankIndexSubscription);
  }

  subscribeSelectedMusicianIndex() {
    const selectedMusicianIndexSubscription = this.pentagramService.selectedMusicianIndex.subscribe(musicianIndex => {
      this.selectedMusicianIndex = musicianIndex;
    });
    this.subscriptions.push(selectedMusicianIndexSubscription);
  }

  subscribeCurrentSongPoint() {
      const currentSongPointSubscription = this.playerService.currentSongPoint.subscribe(percent => {
            this.ngZone.run(() => this.currentSongPoint = percent);
      });
      this.subscriptions.push(currentSongPointSubscription);
  }

  subscribeSelectedHitStrength() {
    const selectedHitStrengthSubscription = this.pentagramService.selectedHitStrength.subscribe(hitStrength => {
      this.currentHitStrength = hitStrength;
    });
    this.subscriptions.push(selectedHitStrengthSubscription);
  }

  subscribeCurrentUndoRedoBeat() {
    const currentUndoRedoBeatSubscription = this.undoRedoBeatService.currentUndoRedoBeat.subscribe(undoRedo => {
      if (undoRedo) {
        this.onUndoRedoBeatChange(undoRedo.undoRedoBeat, undoRedo.type);
      }
    });
    this.subscriptions.push(currentUndoRedoBeatSubscription);
  }

  subscribeCurrentSongPlaying() {
    const currentSongPlayingSubscription = this.playerService.currentSongPlaying.subscribe(currentSongPlaying => {
      this.currentSongPlaying = currentSongPlaying;
    });
    this.subscriptions.push(currentSongPlayingSubscription);
  }


  /* Finish subscriptions */

  @HostListener('window:keydown', ['$event'])
  keydownEvent(event: KeyboardEvent) {
    if(event.ctrlKey && event.key === 'c'){
      this.copiedBeats = this.selectedBeats;
    }
    if(event.ctrlKey && event.key === 'v'){
      const pastedBeats: Beat[] = [];
      const avancedTime = this.beatGhost?.time - this.copiedBeats[0]?.time;
      for(const beat of this.copiedBeats) {
        const pastedBeat = new Beat(beat.time + avancedTime, beat.plank ,beat.isUp, beat.musician, beat.color);
        this.currentPentagram.beats.push(pastedBeat);
        pastedBeats.push(pastedBeat);
      }
      this.undoRedoBeatService.add(addAction, pastedBeats);
      this.pentagramService.updateCurrentPentagram(this.currentPentagram);
    }
    if(event.ctrlKey && event.key === 'z'){
      this.undoRedoBeatService.undo();
    }
    if(event.ctrlKey && event.shiftKey && event.key === 'Z'){
      this.undoRedoBeatService.redo();
    }
    if(event.key === 'Shift'){
      this.shiftPressed = true;
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyupEvent(event: KeyboardEvent) {
    if(event.key === 'Shift'){
      this.shiftPressed = false;
    }
  }

  private onUndoRedoBeatChange(undoRedoBeat: UndoRedoBeat, type: string) {
    if (undoRedoBeat && type) {
      const addValue = type === 'undo' ? removeAction : addAction;
      const removeValue = type === 'redo' ? removeAction : addAction;

      const currentBeatIndex = this.currentPentagram.beats.findIndex(
        (b) => JSON.stringify(b) === JSON.stringify(undoRedoBeat.beats[0])
      );
      if (undoRedoBeat.action === removeValue && currentBeatIndex !== -1) {
        this.currentPentagram.beats.splice(currentBeatIndex, undoRedoBeat.beats?.length);
      } else if (undoRedoBeat.action === addValue && currentBeatIndex === -1) {
        for(const beat of undoRedoBeat.beats) {
          this.currentPentagram.beats.push(beat);
        }
      }
      this.pentagramService.updateCurrentPentagram(this.currentPentagram);
    }
  }

  calculateStepTimeRange() {
    this.stepTimeRange = this.currentPentagram.config.rhythmicalWeight;
  }

  deleteNote(beat: Beat) {
    const currentBeatIndex = this.currentPentagram.beats.findIndex(
      b =>  JSON.stringify(b) === JSON.stringify(beat)
    );

    if (currentBeatIndex !== -1) {
      this.undoRedoBeatService.add(removeAction, [beat]);
      this.currentPentagram.beats.splice(currentBeatIndex, 1);
      this.pentagramService.updateCurrentPentagram(this.currentPentagram);
    }
  }

  isMuted(musicianId: number) {
    const musician: Musician = this.currentPentagram.musicians.find(m => m.id === musicianId);
    return musician?.mute;
  }

  onMouseMove(event) {
    if(this.currentSongPlaying) {
      return;
    }
    const eventOverClass = event.target?.classList;
    if (eventOverClass.contains(beatUpClass) || eventOverClass.contains(beatDownClass)) {
      return;
    }

    const beat = this.getNewBeat(event);
    if (beat && !this.shiftPressed) {
      this.beatGhost = beat;
    }
  }

  addNote(event) {
    if(this.currentSongPlaying) {
      return;
    }
    const beat = this.getNewBeat(event);
    const eventOverClass = event.target?.classList;
    if (!eventOverClass.contains(beatUpClass) && !eventOverClass.contains(beatDownClass) && !this.shiftPressed) {
      this.selectContainer.clearSelection();
    }
    if (beat && !this.shiftPressed) {
      this.undoRedoBeatService.add(addAction, [beat]);

      this.currentPentagram.beats.push(beat);
      this.pentagramService.updateCurrentPentagram(this.currentPentagram);
    }
  }

  dropNotes(event) {
    const rect = event.container.element.nativeElement.getBoundingClientRect();
    const size = rect.width;
    for(const beat of this.selectedBeats){
        beat.time += event.distance.x * this.currentPentagram.config.duration / size;
        this.undoRedoBeatService.add(addAction, beat);
    }
    this.pentagramService.updateCurrentPentagram(this.currentPentagram);

  }

  getIsSelectedItem(beat: Beat) {
    for(const selectedBeat of this.selectedBeats){
      if (selectedBeat?.time === beat?.time) {
        return false;
      }
    }
    return true;
  }

  mouseBeatLeave() {
    if(this.currentSongPlaying) {
      return;
    }
    this.beatGhost = null;
  }

  private getTimeReduce(time) {
    const reduced = time / 10;
    return Math.floor(reduced) * 10;
  }

  private iUpOfPlank(yPosition: number, height: number) {
    let midPoint: number = (height - this.plankMargin) / 2;
    const countPlanks: number = this.currentPentagram.planks.length;
    const isEven: boolean = countPlanks % 2 === 0;

    const midIndex = Math.floor(countPlanks / 2);

    if (isEven) {
      midPoint -= ((midIndex - this.selectedPlankIndex) * this.plankMargin) - (this.plankMargin / 2);
    } else {
      midPoint -= ((midIndex - this.selectedPlankIndex) * this.plankMargin);
    }

    return yPosition < midPoint;
  }

  private getNewBeat(event): Beat {
    const rect = event.target.getBoundingClientRect();
    const size = rect.width;
    const duration = this.currentPentagram.config.duration;
    const xPosition = event.clientX - rect.left;
    const yPosition = event.clientY - rect.top;
    const beatTime = (xPosition * duration) / size;

    const musicians = this.currentPentagram.musicians;

    if(musicians.length <= 0) {
      return null;
    }

    if (!rect.width && !rect.height) {
      return null;
    }

    const targetPlank = this.currentPentagram.planks?.[this.selectedPlankIndex];
    let musician = this.currentPentagram.musicians?.[this.selectedMusicianIndex];
    if (!targetPlank.id || !musician?.id && musicians.length > 2) {
      return null;
    }

    const upOfPlank = this.iUpOfPlank(yPosition, rect.height);
    if (musicians.length === 2) {
      musician = this.currentPentagram.musicians[upOfPlank ? 0 : 1];
    }

    // eslint-disable-next-line max-len
    const currentBeatIndex = this.currentPentagram.beats.findIndex(beat => beat.time === this.getTimeReduce(beatTime));
    if (currentBeatIndex === -1 && this.getTimeReduce(beatTime)) {
      const beat = new Beat(this.getTimeReduce(beatTime), targetPlank.id ,upOfPlank, musician.id, musician.color);
      beat.hitStrength = this.currentHitStrength;

      return beat;
    }

    return null;
  }

}
