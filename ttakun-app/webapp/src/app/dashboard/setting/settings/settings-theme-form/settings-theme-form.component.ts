import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { DEFAULT_THEME, THEME_DARK, THEME_LIGHT } from '../../../../core/services/visual/theme.service';

@Component({
  selector: 'app-settings-theme-form',
  templateUrl: './settings-theme-form.component.html',
  styleUrls: ['./settings-theme-form.component.css']
})
export class SettingsThemeFormComponent implements OnInit, OnChanges, OnDestroy {
  form: FormGroup;
  options: { id: number; label: string; image: string }[];
  @Input() theme: number;
  @Output() themeChanged = new EventEmitter<number>();
  private subscription: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loadOptions();
    this.form = this.fb.group({
      theme: ''
    });
    this.subscription = this.form.get('theme').valueChanges.subscribe(theme => this.themeChanged.emit(theme));
    this.updateForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['theme']) {
      this.updateForm();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private updateForm() {
    if (this.form) {
      this.form.reset({
        theme: this.theme || DEFAULT_THEME
      });
    }
  }

  private loadOptions() {
    this.options = [
      {id: THEME_LIGHT.id, label: 'dashboard.settings.theme.light', image: '/assets/images/theme-light.svg'},
      {id: THEME_DARK.id, label: 'dashboard.settings.theme.dark', image: '/assets/images/theme-dark.svg'},
    ];
  }
}
