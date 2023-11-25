import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserApiService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${ environment.apiUrl }users`;
  }

  updatePassword(password: string, passwordRepeat: string) {
    return this.httpClient.put(`${ this.apiUrl }/change-password`, { password, passwordRepeat });
  }

  updateLanguage(localeLanguage: string) {
    return this.httpClient.put(`${this.apiUrl}/language`, { localeLanguage });
  }
}
