import { mapCollection, sortByString } from '../../utils/collection.utils';
import { Sound } from '../sound';

export class SoundBuilder {
  static fromJson(json) {
    return (json)
      ? new Sound(
        json.hash,
        json.type,
        json.note,
        json.path,
      )
      : null;
  }

  static fromList(list): Sound[] {
    return (Array.isArray(list)) ? sortByString('note', mapCollection(SoundBuilder.fromJson, list)) : [];
  }
}
