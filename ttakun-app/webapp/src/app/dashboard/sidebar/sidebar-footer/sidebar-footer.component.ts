import { Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Beat, Pentagram } from 'src/app/core/models/pentagram';
import { PentagramService } from '../../pentagram.service';

@Component({
  selector: 'app-sidebar-footer',
  templateUrl: './sidebar-footer.component.html',
  styleUrls: ['./sidebar-footer.component.css']
})
export class SidebarFooterComponent implements OnInit, OnDestroy {
  @HostBinding('class.config') isHidden = true;
  currentPentagram: Pentagram;
  rangeStepsAndLimits = {
    rhythmicalWeight: {
      step: 50,
      min: 50,
      max: 200
    },
    beatsPerCompass: {
      step: 1,
      min: 2,
      max: 12
    },
    hitStrength: {
      step: 25,
      min: 25,
      max: 100
    },
    startOfPlayback: {
      step: 1,
      min: 0,
      max: 100
    },
    duration: {
      step: 0.1,
      min: 1,
      max: 100
    },
    speed: {
      step: 0.25,
      min: 0.25,
      max: 3
    },
  };
  currentHitStrength: number;
  currentStartOfPlaybackPercent: number;
  currentSpeed: number;
  editDurationMode = false;
  @ViewChild('duration') durationInput: ElementRef;

  subscriptions: Subscription[] = [];

  constructor(
    private pentagramService: PentagramService,
  ) { }

  ngOnInit(): void {
    this.subscribeCurrentPentagram();
    this.subscribeSelectedHitStrength();
    this.subscribeSelectedStartOfPlaybackPercent();
    this.subscribeSelectedSpeed();
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(
        (subscription: Subscription) => subscription.unsubscribe()
      );
    }
  }

  /* Subscriptions */

  subscribeCurrentPentagram() {
    const currentPentagramSubscription = this.pentagramService.currentPentagram.subscribe(penta => {
      this.currentPentagram = penta;
    });
    this.subscriptions.push(currentPentagramSubscription);
  }

  subscribeSelectedHitStrength() {
    const selectedHitStrengthSubscription = this.pentagramService.selectedHitStrength.subscribe(hitStrength => {
      this.currentHitStrength = hitStrength;
    });
    this.subscriptions.push(selectedHitStrengthSubscription);
  }

  subscribeSelectedStartOfPlaybackPercent() {
    const selectedStartOfPlaybackPercentSubscription =
      this.pentagramService.selectedStartOfPlaybackPercent.subscribe(startOfPlaybackPercent => {
        this.currentStartOfPlaybackPercent = startOfPlaybackPercent;
      });
    this.subscriptions.push(selectedStartOfPlaybackPercentSubscription);
  }

  subscribeSelectedSpeed() {
    const selectedSpeedSubscription = this.pentagramService.selectedSpeed.subscribe(speed => {
      this.currentSpeed = speed;
    });
    this.subscriptions.push(selectedSpeedSubscription);
  }

  /* Finish subscriptions */

  toggleHide() {
    this.isHidden = !this.isHidden;
  }

  changeRhythmicalWeightRange(value: string) {
    this.currentPentagram.config.rhythmicalWeight = Number(value);
    this.pentagramService.updateCurrentPentagram(this.currentPentagram);
  }

  changeBeatsPerCompassRange(value: string) {
    this.currentPentagram.config.beatsPerCompass = Number(value);
    this.pentagramService.updateCurrentPentagram(this.currentPentagram);
  }

  changeHitStrengthRange(value: string) {
    this.pentagramService.updateSelectedHitStrength(Number(value));
  }

  changeStartOfPlaybackPercent(value: string) {
    this.pentagramService.updateSelectedStartOfPlaybackPercent(Number(value));
  }

  changeDuration(value: string) {
    const number = Number(value);
    const rounded = Math.round(number * 10) / 10;

    const max = this.rangeStepsAndLimits.duration.max;
    const min = this.rangeStepsAndLimits.duration.min;

    const newValueSeconds = rounded < min ? min : rounded > max ? max : rounded;
    const duration = newValueSeconds * 1000;

    this.currentPentagram.config.duration = duration;
    this.currentPentagram.beats = this.currentPentagram.beats.filter(beat => beat.time <= duration);
    this.pentagramService.updateCurrentPentagram(this.currentPentagram);
  }

  changeSpeed(value: string) {
    this.pentagramService.updateSelectedSpeed(Number(value));
  }

  toggleEditDurationMode() {
    this.editDurationMode = !this.editDurationMode;
    this.durationInput.nativeElement?.focus();
  }

  onCloseEdit() {
    this.editDurationMode = false;
  }

  fixToGrill() {
    const beats: Beat[] = [...this.currentPentagram.beats];
    const fixedBeats: Beat[] = [];
    beats.forEach(beat => {
      const rhythmicalWeight = this.currentPentagram.config.rhythmicalWeight;
      const newBeat = {...beat};
      newBeat.time = Math.round(newBeat.time / rhythmicalWeight) * rhythmicalWeight;

      const beatExist = fixedBeats.findIndex(b => b.time === newBeat.time && b.isUp === newBeat.isUp);
      if (beatExist === -1) {
        fixedBeats.push(newBeat);
      }
    });
    this.currentPentagram.beats = fixedBeats;
    this.pentagramService.updateCurrentPentagram(this.currentPentagram);

  }

}
