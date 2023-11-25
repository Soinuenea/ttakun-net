import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OptionInterface } from 'src/app/core/models/option.interface';
import { TranslationService } from 'src/app/core/services/translation.service';
import { buildOptions } from 'src/app/core/utils/option.utils';
import { AbstractEditionModalForm } from 'src/app/shared/components/modals/edition-modal/abstract-edition-modal-form';
import { levelOptions, rhythmOptions } from './save-pentagram-form.util';

@Component({
  selector: 'app-save-pentagram-form',
  templateUrl: './save-pentagram-form.component.html',
  styleUrls: ['./save-pentagram-form.component.css'],
  providers: [
    {
      provide: AbstractEditionModalForm,
      useExisting: forwardRef(() => SavePentagramFormComponent),
    },
  ],
})
export class SavePentagramFormComponent extends AbstractEditionModalForm<void> implements OnInit {

  form: FormGroup;

  levelOptions: OptionInterface[];
  rhythmOptions: OptionInterface[];
  constructor(
    private fb: FormBuilder,
    private translationService: TranslationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      rhythm: ['', Validators.required]
    });
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
    const rhythmsTranslated = this.rhythmsOption.map(
      rhythm => {
        rhythm.label = this.translationService.getTranslationSync(rhythm.label);
        return rhythm;
      }
    );
    this.levelOptions = buildOptions(levelsTranslated, 'value', 'label');
    this.rhythmOptions = buildOptions(rhythmsTranslated, 'value', 'label');
  }

  updateForm() {
    if (!this.form) {
      return;
    }
    const value = {
      name: '',
      level: '',
      rhythm: ''
    };
    this.form.reset(value);
  }

  getFormData() {
    const value = this.form.value;

    return {
      name: value.name,
      level: value.level,
      rhythm: value.rhythm
    };
  }

  get levelsOption() {
    return levelOptions;
  }

  get rhythmsOption() {
    return rhythmOptions;
  }

}
