import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginInterface } from '../login.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  @Output() login = new EventEmitter<LoginInterface>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const value = this.form.value;
    const loginValues: LoginInterface = { email: value.email, password: value.password };
    this.login.emit(loginValues);
  }

}
