import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../../core/services/validation/validation.service';
import { fieldsMatch } from '../../../../core/validators/fields-match.validator';

const formMapping = Object.freeze({
  password: 'password',
  passwordRepeat: 'passwordRepeat'
});

@Component({
  selector: 'app-settings-password-form',
  templateUrl: './settings-password-form.component.html',
  styleUrls: ['./settings-password-form.component.css']
})
export class SettingsPasswordFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Input() errors: any;
  @Output() save = new EventEmitter<{ password: string; passwordRepeat: string }>();

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      passwordRepeat: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
          fieldsMatch('password')
        ]
      ]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['errors']) {
      this.validationService.showFieldErrors(this.errors, this.form, formMapping);
    }
  }

  onSubmit() {
    const value = this.form.value;
    this.save.emit({ password: value.password, passwordRepeat: value.passwordRepeat });
  }

  reset() {
    this.form.reset();
  }
}
