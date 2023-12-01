import { mapCollection, sortByString } from '../../utils/collection.utils';
import { Penta } from '../penta';
import { PentagramBuilder } from './pentagram.builder';

export class PentaBuilder {
  static fromJson(json) {
    return (json)
      ? new Penta(
        json.hash,
        json.name,
        json.level,
        json.rhythm,
        json.general,
        json.pentagram ? PentagramBuilder.fromJson(JSON.parse(json.pentagram)) : null,
      )
      : null;
  }

  static fromList(list): Penta[] {
    return (Array.isArray(list)) ? sortByString('name', mapCollection(PentaBuilder.fromJson, list)) : [];
  }
}
