import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Beat, Musician, Pentagram, Plank } from 'src/app/core/models/pentagram';
import { TranslationService } from 'src/app/core/services/translation.service';
import { server } from 'src/environments/environment';
import { AudioResolverService } from '../../audio-resolver.service';
import { PentagramService } from '../../pentagram.service';
import { PlayerService } from '../../player.service';
import { SidebarSoundService } from '../sidebar-sound.service';

const soundBasePath = `${server}files/sounds/`;
const milisStep = 50;

@Component({
  selector: 'app-sidebar-player',
  templateUrl: './sidebar-player.component.html',
  styleUrls: ['./sidebar-player.component.css']
})
export class SidebarPlayerComponent implements OnInit, OnDestroy {
  currentPentagram: Pentagram;
  currentPentagramTitle: string;
  currentSongPoint = 0;
  currentSpeed = 1;
  currentSongPointSpeed = 0;
  playing: boolean;
  planks: Plank[];
  sounds: any = {};

  currentStartOfPlayback = 0;

  activeLoop: boolean;

  audios: { ms: number; audio: any; musician: number }[] = [];
  loadedAudios: { soundStrength: { sound: number; hitStrength: number }; audio: any }[] = [];

  intervalId;
  timeoutIds = [];

  subscriptions: Subscription[] = [];

  constructor(
    private pentagramService: PentagramService,
    private sidebarSoundService: SidebarSoundService,
    private playerService: PlayerService,
    private audioResolverService: AudioResolverService,
    private translationService: TranslationService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.subscribeCurrentPentagram();
    this.subscribeSelectedStartOfPlaybackPercent(); // initPlayer inside
    this.subscribeSelectedSpeed();
    this.subscribeActiveLoop();
    this.subscribeActiveLoop();
    this.subscribeCurrentPentagramTitle();
  }

  ngOnDestroy() {
    this.clearAudioTimeOuts();
    clearInterval(this.intervalId);

    if (this.subscriptions) {
      this.subscriptions.forEach(
        (subscription: Subscription) => subscription.unsubscribe()
      );
    }
  }

  initPlayer() {
    this.clearAudioTimeOuts();
    clearInterval(this.intervalId);

    this.changeCurrentSongPoint(this.currentStartOfPlayback);
    this.playing = false;
    this.playerService.updateCurrentSongPlaying(false);
  }

  onPausePress() {
    this.playing = false;
    this.playerService.updateCurrentSongPlaying(false);
    this.clearAudioTimeOuts();
    clearInterval(this.intervalId);
  }

  onPlayPress() {
    this.createSounds();
    this.createTimeOuts();

    this.currentSongPoint /= this.currentSpeed;
    this.playing = true;
    this.playerService.updateCurrentSongPlaying(true);

    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(
        ()=> this.onPlayingTimer(milisStep),
          milisStep
      );
    });
  }

  onStopPress() {
    this.currentSongPointSpeed = this.currentStartOfPlayback;
    this.initPlayer();
  }

  createSounds() {
    this.audios.length = 0;
    this.loadedAudios.length = 0;
    this.currentPentagram.beats.forEach((b) => {
      if ( this.loadedAudios.length === 0) {
        this.createSound(b);
      } else {
        // eslint-disable-next-line max-len
        const foundLoadedAudio = this.loadedAudios.find(beat => beat.soundStrength.sound === b.plank && beat.soundStrength.hitStrength === b.hitStrength);
        if (!foundLoadedAudio) {
          this.createSound(b);
        }
      }
    });
    this.audios = this.currentPentagram.beats.map(beat => {
      return {
        ms: beat.time,
        audio: this.loadedAudios.find(b => b.soundStrength.sound === beat.plank && b.soundStrength.hitStrength === beat.hitStrength).audio,
        musician: beat.musician
      };
    }).sort((a, b) => a.ms - b.ms);
  }

  onPlayingTimer(ms: number) {
    this.currentSongPoint += ms;

    this.currentSongPointSpeed = this.currentSongPoint * this.currentSpeed;

    const percent = (this.currentSongPoint * 100) / (this.currentPentagram.config.duration / this.currentSpeed);
      this.playerService.updateCurrentSongPoint(percent);

    if (this.currentSongPoint >= this.currentPentagram.config.duration / this.currentSpeed) {
        this.currentSongPointSpeed = this.currentStartOfPlayback;
        this.initPlayer();

        if (this.activeLoop) {
          this.onPlayPress();
        }
    }
  }

  createTimeOuts() {
    this.audios.forEach(e => {
      if (e.ms >= this.currentSongPoint) {
        const timeToNext = (e.ms - this.currentSongPoint) / this.currentSpeed;
        const musicianMuted = this.isMuted(e.musician);
        this.timeoutIds.push(
          this.ngZone.runOutsideAngular(()=>setTimeout(() => this.soundPlay(e.audio, musicianMuted), timeToNext))
        );
      }
    });
  }

  soundPlay(audio: HTMLAudioElement, isMuted: boolean) {
    if (audio) {
       if (!isMuted) {
         if(audio.currentTime > 0) {
          audio.currentTime = 0;
          audio.play();
         }else{
          audio.play();
         }
       }
    }
  }

  clearAudioTimeOuts() {
    this.timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
  }

  /* Subscriptions */

  subscribeCurrentPentagram() {
    const currentPentagramSubscription = this.pentagramService.currentPentagram.subscribe(penta => {
      this.getSounds(penta.planks);
      this.currentPentagram = penta;
    });
    this.subscriptions.push(currentPentagramSubscription);
  }

  subscribeSelectedStartOfPlaybackPercent() {
    const selectedStartOfPlaybackPercentSubscription =
      this.pentagramService.selectedStartOfPlaybackPercent.subscribe(startOfPlaybackPercent => {
        this.currentStartOfPlayback =
          (startOfPlaybackPercent * this.currentPentagram.config.duration) / 100;
          this.currentSongPointSpeed = this.currentStartOfPlayback;
        this.initPlayer();
      });
    this.subscriptions.push(selectedStartOfPlaybackPercentSubscription);
  }

  subscribeSelectedSpeed() {
    const selectedSpeedSubscription = this.pentagramService.selectedSpeed.subscribe(speed => {
      this.currentSpeed = speed;
    });
    this.subscriptions.push(selectedSpeedSubscription);
  }

  subscribeActiveLoop() {
    const activeLoopSubscription = this.playerService.currentActiveLoop.subscribe(active => {
      this.activeLoop = active;
    });
    this.subscriptions.push(activeLoopSubscription);
  }

  subscribeCurrentPentagramTitle() {
    const currentPentagramTitleSubscription = this.pentagramService.currentPentagramTitle.subscribe(pentaTitle => {
      this.currentPentagramTitle = pentaTitle;
    });
    this.subscriptions.push(currentPentagramTitleSubscription);
  }

  /* Finish subscriptions */

  getCurrentPentagramTitle() {
    return this.currentPentagramTitle ?
      this.currentPentagramTitle :
      this.translationService.getTranslationSync('sidebar.player.newMusicSheet');
  }

  changeCurrentSongPoint(value: number) {
    this.currentSongPoint = this.getNearValidValue(value);
    const percent = (this.currentSongPoint * 100) / (this.currentPentagram.config.duration);
    this.playerService.updateCurrentSongPoint(percent);
  }

  private getSounds(planks: Plank[]) {
    if (JSON.stringify(this.planks) !== JSON.stringify(planks)) {
      planks.forEach(plank => {
        this.sidebarSoundService.getSound(plank.sound.type, plank.sound.note)
          .subscribe(sound => {
              this.sounds[plank.id.toString()] = soundBasePath + sound.path;
              this.audioResolverService.preloadAudio(soundBasePath + sound.path);
            }
          );
      });
    }

    this.planks = [...planks];
  }

  private getNearValidValue(value) {
    const rhythmicalWeight = this.currentPentagram.config.rhythmicalWeight;
    return Math.ceil(value / rhythmicalWeight) * rhythmicalWeight;
  }

  private calculateVolume(hitStrength: number) {
    return hitStrength ? hitStrength / 100 : 1;
  }

  private isMuted(musicianId: number) {
    const musician: Musician = this.currentPentagram.musicians.find(m => m.id === musicianId);
    return musician?.mute;
  }

  private createSound(beat: Beat) {
    const audio = new Audio();
    audio.volume = this.calculateVolume(beat.hitStrength);
    audio.src = this.sounds[beat.plank];
    audio.load();
    this.loadedAudios.push({soundStrength: {sound:beat.plank, hitStrength: beat.hitStrength}, audio});
  }

  toggleActiveLoop() {
    this.playerService.updateCurrentActiveLoop(!this.activeLoop);
  }

}
