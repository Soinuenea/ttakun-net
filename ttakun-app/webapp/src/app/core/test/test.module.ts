import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from './translate.service.stub';

export const testImports = [ RouterTestingModule, ReactiveFormsModule, TranslateModule ];

export const testProviders = [ { provide: TranslateService, useClass: TranslateServiceStub } ];
