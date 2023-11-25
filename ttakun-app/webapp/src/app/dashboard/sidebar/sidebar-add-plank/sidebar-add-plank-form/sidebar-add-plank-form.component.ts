import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddPlankInterface } from 'src/app/core/models/add-plank.interface';
import { OptionInterface } from 'src/app/core/models/option.interface';
import { Sound } from 'src/app/core/models/sound';
import { SoundType } from 'src/app/core/models/sound-type';
import { TranslationService } from 'src/app/core/services/translation.service';
import { buildOptions, buildOptionsAndEmpty } from 'src/app/core/utils/option.utils';
import { AbstractEditionModalForm } from 'src/app/shared/components/modals/edition-modal/abstract-edition-modal-form';

const defaultPlankColor = '#000000';

@Component({
  selector: 'app-sidebar-add-plank-form',
  templateUrl: './sidebar-add-plank-form.component.html',
  styleUrls: ['./sidebar-add-plank-form.component.css'],
  providers: [
    {
      provide: AbstractEditionModalForm,
      useExisting: forwardRef(() => SidebarAddPlankFormComponent),
    },
  ],
})
export class SidebarAddPlankFormComponent extends AbstractEditionModalForm<void> implements OnInit, OnChanges, OnDestroy {
  form: FormGroup;
  @Input() soundTypes: SoundType[];
  @Input() sounds: Sound[];
  soundTypeOptions: OptionInterface[];
  soundNoteOptions: OptionInterface[];
  color!: string;
  private subscriptions: Subscription[];


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
    if (changes['soundTypes'] && this.soundTypes) {
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

  private updateOptions() {
    const soundTypesTranslated = this.soundTypes.map(
      soundType => {
        soundType.label = this.translationService.getTranslationSync(soundType.label);
        return soundType;
      }
    );
    this.soundTypeOptions = buildOptionsAndEmpty(soundTypesTranslated, 'value', 'label');

    this.color = defaultPlankColor;

  }

  private createForm() {
    this.form = this.fb.group({
      type: ['', Validators.required],
      note: ['', Validators.required],
      color: [defaultPlankColor, Validators.required],
    });
    this.subscribeFields();
    this.updateForm();
  }

  updateForm() {
    if (!this.form) {
      return;
    }
    const value = {
      type: '',
      note: '',
      color: defaultPlankColor,
    };
    this.form.reset(value);
  }

  getFormData(): AddPlankInterface {
    const value = this.form.value;

    return {
      type: value.type,
      note: value.note,
      color: value.color,
    };
  }

  private onTypeChanged = (type: string) => {
    if (type) {
      this.soundNoteOptions = buildOptions(this.sounds?.filter(sound => sound.type === type), 'note', 'note');
    } else {
      this.soundNoteOptions = [];
    }
  };

  private subscribeFields() {
    const typeSubscription = this.form.get('type').valueChanges.subscribe(this.onTypeChanged);
    this.subscriptions = [ typeSubscription ];
  }

  get colorChange() {
    let newColor: string;
    return newColor = this.color;
  }

  public onChangeColor(color: string): void {
    this.color = color;
    this.form.patchValue({ color });
  }

}
