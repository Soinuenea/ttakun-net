import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PentaBuilder } from '../../models/builder/penta.builder';
import { Pentagram } from '../../models/pentagram';

@Injectable()
export class PentagramApiService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${ environment.apiUrl }pentagram`;
  }

  savePentagram(data: any, pentagram: Pentagram) {
    const postBody = { name: data.name, level: data.level, rhythm: data.rhythm, pentagram };
    return this.httpClient.post(`${this.apiUrl}`, postBody).toPromise();
  }

  getPentagrams() {
    return this.httpClient
      .get(`${this.apiUrl}`)
      .pipe(map(PentaBuilder.fromList));
  }

  getPentagram(hash: string) {
    return this.httpClient
      .get(`${this.apiUrl}/${hash}`)
      .pipe(map(PentaBuilder.fromJson));
  }

}
