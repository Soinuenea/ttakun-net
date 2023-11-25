import { Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { OptionInterface } from 'src/app/core/models/option.interface';
import { Penta } from 'src/app/core/models/penta';
import { TranslationService } from 'src/app/core/services/translation.service';
import { parseBoolean } from 'src/app/core/utils/boolean.utils';
import { mapCollection, unique } from 'src/app/core/utils/collection.utils';
import { parseNumber } from 'src/app/core/utils/number.utils';
import { buildOptions, buildOptionsAndEmpty } from 'src/app/core/utils/option.utils';
import { AbstractEditionModalForm } from 'src/app/shared/components/modals/edition-modal/abstract-edition-modal-form';
import { levelOptions, pentagramGeneralOptions, rhythmOptions } from './load-pentagram-form.util';

@Component({
  selector: 'app-load-pentagram-form',
  templateUrl: './load-pentagram-form.component.html',
  styleUrls: ['./load-pentagram-form.component.css'],
  providers: [
    {
      provide: AbstractEditionModalForm,
      useExisting: forwardRef(() => LoadPentagramFormComponent),
    },
  ],
})
export class LoadPentagramFormComponent extends AbstractEditionModalForm<void> implements OnInit, OnChanges, OnDestroy {

  form: FormGroup;
  @Input() pentagrams: Penta[];

  @Output() selectedGeneral = new EventEmitter<boolean>();
  @Output() selectedLevel = new EventEmitter<number>();
  @Output() selectedRhythm = new EventEmitter<number>();

  @Input() general: boolean;


  levelOptions: OptionInterface[];
  rhythmOptions: OptionInterface[];
  pentagramOptions: OptionInterface[];

  subscriptions: Subscription[];

  constructor(
    private fb: FormBuilder,
    private translationService: TranslationService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pentagrams'] && this.pentagrams) {
      this.updateOptions();
    }
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(
        (subscription: Subscription) => subscription.unsubscribe()
      );
    }
  }

  private createForm() {
    this.form = this.fb.group({
      general: [false, Validators.required],
      level: null,
      rhythm: null,
      pentagram: [null, Validators.required],
    });
    this.subscribeFields();
    this.updateForm();
    this.updateOptions();
  }

  private updateOptions() {
    const levelsTranslated = this.levelsOption.map(
      level => {
        level.label = this.translationService.getTranslationSync(level.label);
        return level;
      }
    );
    this.levelOptions = buildOptions(levelsTranslated, 'value', 'label');
    this.buildRhythmOptions(this.rhythmOptions);
    this.pentagramOptions = buildOptionsAndEmpty(this.filterPentagrams(), 'hash', 'pentaName');
  }

  private buildRhythmOptions(rhythmsOption) {
    const rhythmsTranslated = rhythmsOption.map(
      rhythm => {
        rhythm.label = this.translationService.getTranslationSync(rhythm.label);
        return rhythm;
      }
    );
    this.rhythmOptions = buildOptions(rhythmsTranslated, 'value', 'label');
  }

  private filterPentagrams() {
    const general = parseBoolean(this.form.value.general);
    const level = parseNumber(this.form.value.level);
    const rhythm = this.form.value.rhythm;
    return this.filterPentagram(general, level, rhythm);
  }

  private onGeneralChanged = (value: any) => {
    const general = parseBoolean(value);
    const level = parseNumber(this.form.value.level);
    const rhythm = this.form.value.rhythm;
    const list = this.filterPentagram(general, level, rhythm);
    this.pentagramOptions = buildOptionsAndEmpty(list, 'hash', 'pentaName');
  };

  private onLevelChanged = (value: any) => {
    const general = parseBoolean(this.form.value.general);
    const level = parseNumber(value);
    const rhythm = this.form.value.rhythm;
    const list = this.filterPentagram(general, level, rhythm);
    const rhythmsPerLevel = unique(mapCollection(penta => penta?.rhythm, this.filterPentagramByLevel(general, level)));
    const filteredRhythmList = [this.rhythmsOption.find(rhythmOption => rhythmOption.value === null)];
    for(const rhythmPerLevel of rhythmsPerLevel){
      const filteredRhythm = this.rhythmsOption.find(rhythmOption => rhythmOption.value === rhythmPerLevel);
      filteredRhythmList.push(filteredRhythm);
    }
    this.buildRhythmOptions(filteredRhythmList.sort((a, b) => Number(a.id) - Number(b.id)));

    this.pentagramOptions = buildOptionsAndEmpty(list, 'hash', 'pentaName');
  };

  private onRhythmChanged = (value: any) => {
    const general = parseBoolean(this.form.value.general);
    const level = parseNumber(this.form.value.level);
    const rhythm = value;
    const list = this.filterPentagram(general, level, rhythm);
    this.pentagramOptions = buildOptionsAndEmpty(list, 'hash', 'pentaName');
  };

  private filterPentagram = (general: boolean, level: number, rhythm: string) => {
    return this.pentagrams?.filter(p => p.level === (Number.isNaN(level) ? null : level) && p.rhythm === rhythm && p.general === general);
  };

  private filterPentagramByLevel = (general: boolean, level: number) => {
    return this.pentagrams?.filter(p => p.level === (Number.isNaN(level) ? null : level) && p.general === general);
  };

  private subscribeFields() {
    const generalSubscription = this.form
      .get('general')
      .valueChanges.pipe(distinctUntilChanged(), tap(this.onGeneralChanged))
      .subscribe();
    const levelSubscription = this.form
      .get('level')
      .valueChanges.pipe(distinctUntilChanged(), tap(this.onLevelChanged))
      .subscribe();
    const rhythmSubscription = this.form
      .get('rhythm')
      .valueChanges.pipe(distinctUntilChanged(), tap(this.onRhythmChanged))
      .subscribe();

    this.subscriptions = [ generalSubscription, levelSubscription, rhythmSubscription ];
  }

  updateForm() {
    if (!this.form) {
      return;
    }
    const value = {
      general: false,
      level: null,
      rhythm: null,
      pentagram: null,
    };
    this.form.reset(value);
  }

  getFormData() {
    const value = this.form.value;

    return value.pentagram;
  }

  get pentagramGeneralOptions() {
    return pentagramGeneralOptions.map(
      general => {
        general.label = this.translationService.getTranslationSync(general.label);
        return general;
      }
    );
  }

  get levelsOption() {
    return levelOptions;
  }

  get rhythmsOption() {
    return rhythmOptions;
  }

}
