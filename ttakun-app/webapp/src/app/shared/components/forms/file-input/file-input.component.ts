import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { hasRequiredField } from 'src/app/core/utils/form.utils';
import { find } from '../../../../core/utils/collection.utils';
import { FileInterface } from '../../../../core/utils/file.interface';

const getFile = (input: HTMLInputElement) => {
  return (input.files && input.files[0]) ? input.files[0] : null;
};

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit, OnDestroy {
  control: FormControl;
  @Input() id: string;
  @Input() controlName: string;
  @Input() form: FormGroup;
  @Input() accept: string | string[];
  @Input() class: string;
  @Output() fileChanged = new EventEmitter<File>();
  @ViewChild('fileInput') fileInput: ElementRef;
  private subscription: Subscription;

  ngOnInit(): void {
    this.control = this.form.get(this.controlName) as FormControl;
    this.subscription = this.control.valueChanges
      .pipe(
        filter((file: File) => !file)
      )
      .subscribe(
        () => this.fileInput.nativeElement.value = null
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFileChange() {
    const file = getFile(this.fileInput.nativeElement);
    this.updateFile(file);
  }

  get acceptedExtensions() {
    return (Array.isArray(this.accept)) ? (this.accept as string[]).join(',') : this.accept;
  }

  onFileDropped(files: NgxFileDropEntry[]) {
    const droppedFile = find(file => file.fileEntry.isFile, files);
    if (droppedFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file(this.updateFile);
    }
  }

  hasRequiredField(control: AbstractControl) {
    return hasRequiredField(control);
  }

  private updateFile = (file: File) => {
    const fileInfo: FileInterface = (file) ? {name: file.name, type: file.type, size: file.size} : null;

    this.fileChanged.emit(file);
    this.control.setValue(fileInfo);
    this.control.markAsTouched();
  };
}
