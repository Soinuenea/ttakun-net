import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { TranslateService } from '@ngx-translate/core';
import { Penta } from 'src/app/core/models/penta';
import { Beat, Config, Musician, Pentagram, Plank, PlankSound } from 'src/app/core/models/pentagram';
import { getLanguageCode, setLanguageCode } from 'src/app/core/services/storage.service';
import { ToasterService } from 'src/app/core/services/visual/toaster.service';
import { PentagramService } from '../pentagram.service';
import { UndoRedoBeatService } from '../undo-redo-beat.service';
import { LoadPentagramComponent } from './load-pentagram/load-pentagram.component';
import { SavePentagramComponent } from './save-pentagram/save-pentagram.component';
import { ImportPentagramComponent } from './import-pentagram/import-pentagram.component';

const SAVE_PENTAGRAM_SUCCESS = 'dashboard.footer.save.modal.success.save';
const SAVE_PENTAGRAM_ERROR  = 'dashboard.footer.save.modal.error.save';

const LOAD_PENTAGRAM_SUCCESS = 'dashboard.footer.save.modal.success.load';
const LOAD_PENTAGRAM_ERROR  = 'dashboard.footer.save.modal.error.load';

const READ_FILE_ERROR  = 'dashboard.footer.import.modal.error.read';

const partitureName = 'partiture.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  currentPentagram: Pentagram;

  @ViewChild(SavePentagramComponent) savePentagramModal: SavePentagramComponent;
  @ViewChild(LoadPentagramComponent) loadPentagramModal: LoadPentagramComponent;
  @ViewChild(ImportPentagramComponent) importPentagramModal: ImportPentagramComponent;

  @ViewChild('download') downloadElement: ElementRef;

  @Input() context;

  canUndo = false;
  canRedo = false;

  subscriptions: Subscription[] = [];

  constructor(
    private pentagramService: PentagramService,
    private toasterService: ToasterService,
    private undoRedoBeatService: UndoRedoBeatService,
    private canDeactivateGuard: CanDeactivateGuard,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.subscribeToCurrentPentagram();
    this.subscribeToCurrentUndoRedoBeatCount();
    this.subscribeToCurrentCanRedo();
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(
        (subscription: Subscription) => subscription.unsubscribe()
      );
    }
  }

  subscribeToCurrentPentagram() {
    const currentPentagramSubscription = this.pentagramService.currentPentagram.subscribe(pentagram => {
      this.currentPentagram = pentagram;
    });
    this.subscriptions.push(currentPentagramSubscription);
  }

  subscribeToCurrentUndoRedoBeatCount() {
    const currentUndoRedoBeatCountSubscription = this.undoRedoBeatService.currentUndoRedoBeatCount.subscribe(count => {
      this.canUndo = count && count > 0;
    });
    this.subscriptions.push(currentUndoRedoBeatCountSubscription);
  }

  subscribeToCurrentCanRedo() {
    const currentCanRedocription = this.undoRedoBeatService.currentCanRedo.subscribe(canRedo => {
      this.canRedo = canRedo;
    });
    this.subscriptions.push(currentCanRedocription);
  }

  openSavePentagramModal() {
    this.savePentagramModal.open();
  }

  openLoadPentagramModal() {
    this.loadPentagramModal.open();
  }

  openImportPentagramModal() {
    this.importPentagramModal.open();
  }

  async onNewPentagram() {
    const newPentagramSubscription = this.canDeactivateGuard.canDeactivate(this.context).subscribe(isContinue => {
      if (isContinue) {
        this.newPentagram();
      }
    });
    this.subscriptions.push(newPentagramSubscription);
  }

  newPentagram() {
    this.pentagramService.updateCurrentPentagramTitle(null);
    this.pentagramService.updateCurrentPentagram(new Pentagram());
  }

  async changeLanguage(language: string) {
    try {
        await this.pentagramService.updateLanguage(language);
        this.translate.use(language);
        setLanguageCode(language);
    } catch (errors) {
      this.translate.use(language);
      setLanguageCode(language);
    }
  }

  get currentLanguage() {
    return getLanguageCode();
  }

  async onSavePentagram(data: any, modal: SavePentagramComponent) {
    try {
      await this.pentagramService.savePentagram(data, this.currentPentagram);
      this.pentagramService.updateCurrentPentagramTitle(data.pentaName);
      this.toasterService.showSuccessTranslating(SAVE_PENTAGRAM_SUCCESS);
      modal.close();
    } catch (error) {
       this.toasterService.showErrorTranslating(SAVE_PENTAGRAM_ERROR);
    }
  }

  async onLoadPentagram(hash: string, modal: LoadPentagramComponent) {
    const loadPentagramSubscription = this.canDeactivateGuard.canDeactivate(this.context).subscribe(isContinue => {
      if (isContinue) {
        this.loadPentagram(hash, modal);
      }
    });
    this.subscriptions.push(loadPentagramSubscription);
  }

  async onImportPentagram(data: any, modal: ImportPentagramComponent) {
    const importPentagramSubscription = this.canDeactivateGuard.canDeactivate(this.context).subscribe(isContinue => {
      if (isContinue) {
        this.importPentagram(data, modal);
      }
    });
    this.subscriptions.push(importPentagramSubscription);
  }

  async loadPentagram(hash: string, modal: LoadPentagramComponent) {
    try {
      const penta: Penta = await this.pentagramService.resolvePentagram(hash).toPromise();
      this.fixBeats(penta.pentagram);
      this.pentagramService.updateCurrentPentagramTitle(penta.pentaName);
      this.pentagramService.updateInitialPentagram(penta.pentagram);
      this.pentagramService.updateCurrentPentagram(penta.pentagram);
      this.undoRedoBeatService.reset();
      this.toasterService.showSuccessTranslating(LOAD_PENTAGRAM_SUCCESS);
      modal.close();
    } catch (error) {
       this.toasterService.showErrorTranslating(LOAD_PENTAGRAM_ERROR);
    }
  }

  async importPentagram(data: any, modal: ImportPentagramComponent) {
    try {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        try {
          const pentagramJson = JSON.parse(fileReader.result.toString());

          const pentagram = new Pentagram();

          pentagram.observations = pentagramJson.observations;
          pentagram.planks = this.getPlanks(pentagramJson.planks);
          pentagram.musicians = this.getMusicians(pentagramJson.musicians);
          pentagram.beats = this.getBeats(pentagramJson.beats);
          pentagram.config = this.getConfig(pentagramJson.config);

          this.fixBeats(pentagram);
          this.pentagramService.updateInitialPentagram(pentagram);
          this.pentagramService.updateCurrentPentagram(pentagram);
          this.undoRedoBeatService.reset();
        } catch (error) {
          this.toasterService.showErrorTranslating(READ_FILE_ERROR);
        }
      };
      fileReader.onerror = (error) => {
        this.toasterService.showErrorTranslating(READ_FILE_ERROR);
      };
      fileReader.readAsText(data);

      modal.close();
    } catch (error) {
       this.toasterService.showErrorTranslating(READ_FILE_ERROR);
    }
  }

  undo() {
    if (this.canUndo) {
      this.undoRedoBeatService.undo();
    }
  }

  redo() {
    if (this.canRedo) {
      this.undoRedoBeatService.redo();
    }
  }

  downloadPentagram() {
    const data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.currentPentagram));
    this.downloadElement.nativeElement.setAttribute('href', 'data:'+data);
    this.downloadElement.nativeElement.setAttribute('download', partitureName);
  }

  private getPlanks(planks) {
    const plankList: Plank[] = [];

    planks.forEach(plank => {
      plankList.push(new Plank(plank.id, plank.color, new PlankSound(plank.sound.type, plank.sound.note)));
    });

    return plankList;
  }

  private getMusicians(musicians) {
    const musicianList: Musician[] = [];

    musicians.forEach(musician => {
      musicianList.push(new Musician(musician.id, musician.color, musician.playingSide));
    });

    return musicianList;
  }

  private getBeats(beats) {
    const beatList: Beat[] = [];

    beats.forEach(beat => {
      beatList.push(new Beat(beat.time, beat.plank, beat.isUp, beat.musician, beat.color));
    });

    return beatList;
  }

  private getConfig(config) {
    return new Config(config.duration , config.playSpeed , config.beatsPerCompass , config.rhythmicalWeight , config.playbackStart);
  }

  private fixBeats(pentagram: Pentagram) {
    const beats: Beat[] = [...pentagram.beats];
    const fixedBeats: Beat[] = [];
    beats.forEach(beat => {
      const rhythmicalWeight = pentagram.config.rhythmicalWeight;
      const newBeat = {...beat};
      newBeat.time = Math.round(newBeat.time / rhythmicalWeight) * rhythmicalWeight;

      const beatExist = fixedBeats.findIndex(b => b.time === newBeat.time && b.isUp === newBeat.isUp);
      if (beatExist === -1) {
        fixedBeats.push(newBeat);
      }
    });
    pentagram.beats = fixedBeats;
  }

}
