import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { getAvoidErrorHandlingHeader, HEADER_PENDING_NO_BLOCKING } from '../base/headers';

@Injectable()
export class ErrorApiService {
  private apiUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.apiUrl = `${ environment.apiUrl }errors`;
  }

  save(error: any) {
    const postBody = { error };
    const headers = getAvoidErrorHandlingHeader().set(HEADER_PENDING_NO_BLOCKING, 'true');

    return this.httpClient.post(this.apiUrl, postBody, { headers });
  }
}
