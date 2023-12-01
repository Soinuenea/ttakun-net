import { Injectable } from '@angular/core';
import { SoundApiService } from 'src/app/core/services/api/sound-api.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarSoundService {

  constructor(
    private soundApiService: SoundApiService,
  ) { }

  getSounds() {
    return this.soundApiService.getSounds();
  }

  getSound(type: string, note: string) {
    return this.soundApiService.getSound(type, note);
  }

}
