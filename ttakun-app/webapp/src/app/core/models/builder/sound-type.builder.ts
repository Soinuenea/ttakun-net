import { sortByString } from '../../utils/collection.utils';
import { mapCollection } from '../../utils/collection.utils';
import { SoundType } from '../sound-type';

export class SoundTypeBuilder {
  static fromJson(json) {
    return (json)
      ? new SoundType(
        json.value,
        json.label
      )
      : null;
  }

  static fromList(list): SoundType[] {
    return (Array.isArray(list)) ? sortByString('value', mapCollection(SoundTypeBuilder.fromJson, list)) : [];
  }
}
