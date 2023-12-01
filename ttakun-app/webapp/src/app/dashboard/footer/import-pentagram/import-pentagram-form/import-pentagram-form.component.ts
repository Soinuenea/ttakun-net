import { Component, ElementRef, forwardRef,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AbstractEditionModalForm } from 'src/app/shared/components/modals/edition-modal/abstract-edition-modal-form';

@Component({
  selector: 'app-import-pentagram-form',
  templateUrl: './import-pentagram-form.component.html',
  styleUrls: ['./import-pentagram-form.component.css'],
  providers: [
    {
      provide: AbstractEditionModalForm,
      useExisting: forwardRef(() => ImportPentagramFormComponent),
    },
  ],
})
export class ImportPentagramFormComponent extends AbstractEditionModalForm<void> implements OnInit {

  form: FormGroup;
  @ViewChild('fileUpload') fileUploadInput: ElementRef;
  uploadedFile: File = null;

  subscriptions: Subscription[];

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      pentagram: [null, Validators.required],
    });
    this.updateForm();
  }


  updateForm() {
    if (!this.form) {
      return;
    }
    const value = {
      pentagram: null,
    };
    this.form.reset(value);
  }


  getFormData() {
    return this.uploadedFile;
  }

  onFileChanged(file: File) {
    this.uploadedFile = file;
  }

}
