import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractEditionModalForm } from 'src/app/shared/components/modals/edition-modal/abstract-edition-modal-form';

const defaultMusicianColor = '#000000';

@Component({
  selector: 'app-sidebar-add-musician-form',
  templateUrl: './sidebar-add-musician-form.component.html',
  styleUrls: ['./sidebar-add-musician-form.component.css'],
  providers: [
    {
      provide: AbstractEditionModalForm,
      useExisting: forwardRef(() => SidebarAddMusicianFormComponent),
    },
  ],
})
export class SidebarAddMusicianFormComponent extends AbstractEditionModalForm<void> implements OnInit {

  form: FormGroup;
  color: string = defaultMusicianColor;

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
      color: [defaultMusicianColor, Validators.required],
    });
    this.updateForm();
  }

  updateForm() {
    if (!this.form) {
      return;
    }
    const value = {
      color: defaultMusicianColor,
    };
    this.form.reset(value);
  }

  getFormData() {
    const value = this.form.value;

    return {
      color: value.color,
    };
  }

  get colorChange() {
    let newColor: string;
    return newColor = this.color;
  }

  public onChangeColor(color: string): void {
    this.color = color;
    this.form.patchValue({ color });
  }

}
