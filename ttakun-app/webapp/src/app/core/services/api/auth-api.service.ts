import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  getAnonymousHeader,
  getAnonymousOptions,
  HEADER_AVOID_ERROR_HANDLING,
  HEADER_PENDING_NO_BLOCKING
} from '../base/headers';
import { getSession, setSession } from '../storage.service';

@Injectable()
export class AuthApiService {
  private apiUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.apiUrl = `${environment.apiUrl}auth`;
  }

  checkPasswordRecoveringHash(hash) {
    return this.httpClient.get(`${this.apiUrl}/recover-password/${hash}`, getAnonymousOptions());
  }


  login(email: string, password: string) {
    const url = `${this.apiUrl}/login`;
    const body = { email, password };
    const headers = getAnonymousHeader().set(HEADER_AVOID_ERROR_HANDLING, 'true');

    return this.httpClient.post(url, body, { headers })
      .pipe(
        map(this.saveToken)
      );
  }

  recoverPassword(email) {
    const postBody = { email };
    const headers = getAnonymousHeader().set(HEADER_AVOID_ERROR_HANDLING, 'true');
    const options = { headers };

    return this.httpClient.post(`${this.apiUrl}/recover-password`, postBody, options);
  }

  refreshToken() {
    const url = `${this.apiUrl}/token`;
    const session = getSession();
    const refreshToken = (session) ? session.refreshToken : null;
    const headers = getAnonymousHeader().set(HEADER_PENDING_NO_BLOCKING, 'true').set(HEADER_AVOID_ERROR_HANDLING, 'true');
    const options = { params: { refresh_token: refreshToken }, headers };

    return this.httpClient.post(url, null, options)
      .pipe(
        map(this.saveToken)
      );
  }

  resetPassword(hash, password, passwordRepeat) {
    const postBody = { hash, password, passwordRepeat };

    return this.httpClient.post(`${this.apiUrl}/reset-password`, postBody, getAnonymousOptions());
  }

  private saveToken = (data: any) => {
    const session = { token: data.token, refreshToken: data.refreshToken };
    setSession(session);
  };

  register(email: string, password: string) {
    const postBody = { email, password };
    const headers = getAnonymousHeader().set(HEADER_AVOID_ERROR_HANDLING, 'true');
    const options = { headers };
    return this.httpClient.post(`${this.apiUrl}/register`, postBody, options);
  }

}
