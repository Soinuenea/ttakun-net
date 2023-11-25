import { SoundOptions } from '../sound-options';
import { SoundTypeBuilder } from './sound-type.builder';
import { SoundBuilder } from './sound.builder';

export class SoundsBuilder {
  static fromJson(json) {
    return (json)
      ? new SoundOptions(
        SoundTypeBuilder.fromList(json.soundTypes),
        SoundBuilder.fromList(json.sounds),
      )
      : null;
  }
}
