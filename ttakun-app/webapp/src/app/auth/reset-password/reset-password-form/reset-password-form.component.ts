import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../../core/services/validation/validation.service';

import { fieldsMatch } from '../../../core/validators/fields-match.validator';
import { ResetPasswordInterface } from '../reset-password.interface';

const formMapping = Object.freeze({ password: 'password', passwordRepeat: 'passwordRepeat' });

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Input() errors: any;
  @Output() resetPassword = new EventEmitter<ResetPasswordInterface>();

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      repeatPassword: [
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

  ngOnChanges() {
    this.validationService.showFieldErrors(this.errors, this.form, formMapping);
  }

  onSubmitted() {
    const value = this.form.value;
    const password: ResetPasswordInterface = { password: value.password, repeatPassword: value.repeatPassword };
    this.resetPassword.emit(password);
  }

}
