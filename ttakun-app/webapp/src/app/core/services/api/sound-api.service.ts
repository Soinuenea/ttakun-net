import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { SoundBuilder } from '../../models/builder/sound.builder';
import { SoundsBuilder } from '../../models/builder/sounds.builder';

@Injectable()
export class SoundApiService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = `${ environment.apiUrl }sound`;
  }

  getSounds() {
    return this.httpClient
      .get(`${this.apiUrl}`)
      .pipe(map(SoundsBuilder.fromJson));
  }

  getSound(type: string, note: string) {
    return this.httpClient
      .get(`${this.apiUrl}/${type}/${note}`)
      .pipe(map(SoundBuilder.fromJson));
  }

}
