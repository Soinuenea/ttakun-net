import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover-password-form',
  templateUrl: './recover-password-form.component.html',
  styleUrls: ['./recover-password-form.component.css']
})
export class RecoverPasswordFormComponent implements OnInit {
  form: FormGroup;
  @Output() recover = new EventEmitter<string>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [ '',  [ Validators.required, Validators.email ] ]
    });
  }

  onSubmit() {
    this.recover.emit(this.form.value.email);
  }

}
