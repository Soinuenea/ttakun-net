import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToasterService {
  constructor(
    private toastr: ToastrService,
    private translateService: TranslateService
  ) { }

  showError(message: string) {
    setTimeout(() => this.toastr.error(message, null));
  }

  async showErrorTranslating(message: string, values?: any) {
    const translation = await this.translateService.get(message, values).toPromise();
    this.showError(translation);
  }

  showSuccess(message: string) {
    setTimeout(() => this.toastr.success(message, null));
  }

  async showSuccessTranslating(message: string, values?: any) {
    const translation = await this.translateService.get(message, values).toPromise();
    this.showSuccess(translation);
  }
}
