import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { hasRequiredField } from 'src/app/core/utils/form.utils';
import { OptionInterface } from '../../../../core/models/option.interface';

@Component({
  selector: 'app-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.css']
})
export class AutocompleteFieldComponent {
  @Input() id: string;
  @Input() controlName: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() options: OptionInterface[];
  @Input() class = 'field';
  @Input() allowClear = false;
  @Input() notFoundText = 'shared.autocomplete.notFound';
  @Input() placeholder: string;
  @Input() hideLabel = false;
  @Input() hideErrors = false;
  @Input() searchable = true;

  @Input() addTag: boolean | ((term: string) => any | Promise<any>) = false;
  @Input() addTagText = 'shared.autocomplete.addTag';
  @Output() search = new EventEmitter<string>();
  @Output() changeEvent = new EventEmitter<any>();
  @Output() clear = new EventEmitter<void>();
  @ViewChild('error') error;

  hasRequiredField(control: AbstractControl) {
    return hasRequiredField(control);
  }
}
