import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioResolverService {

  preloadAudio = (url: string): Promise<string> => {
    const audio = new Audio();
    audio.src = url;
    return new Promise((res, req) => audio.addEventListener('canplaythrough', () => res(url), false));
  };

}
