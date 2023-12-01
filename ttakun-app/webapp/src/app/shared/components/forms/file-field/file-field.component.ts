import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { hasRequiredField } from 'src/app/core/utils/form.utils';

@Component({
  selector: 'app-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.css']
})
export class FileFieldComponent {
  @Input() id: string;
  @Input() controlName: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() class = 'field';
  @Input() accept: string;
  @Input() hideErrors = false;
  @Output() fileChanged = new EventEmitter<File>();
  @ViewChild('error') error;

  hasRequiredField(control: AbstractControl) {
    return hasRequiredField(control);
  }
}
