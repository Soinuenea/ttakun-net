import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fieldsMatch } from '../../../core/validators/fields-match.validator';
import { RegisterInterface } from '../register.interface';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  form: FormGroup;
  @Output() register = new EventEmitter<RegisterInterface>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ]],
      repeatPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        fieldsMatch('password')
      ]],
    });
  }

  onSubmit() {
    const value = this.form.value;
    const registerValues: RegisterInterface = { email: value.email, password: value.password, repeatPassword: value.repeatPassword };
    this.register.emit(registerValues);
  }


}
