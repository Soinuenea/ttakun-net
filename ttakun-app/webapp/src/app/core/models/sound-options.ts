import { Sound } from './sound';
import { SoundType } from './sound-type';

export class SoundOptions {
  constructor(
    public soundTypes?: SoundType[],
    public sounds?: Sound[],
  ) { }

  clone() {
    return new SoundOptions(
      this.soundTypes,
      this.sounds,
    );
  }
}
