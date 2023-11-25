import { mapCollection } from '../../utils/collection.utils';
import { Beat, Config, Musician, Pentagram, Plank } from '../pentagram';

export class PentagramBuilder {
  static fromJson(json) {
    if (json) {
      const newPentagram = new Pentagram();
      newPentagram.beats = BeatBuilder.fromList(json.beats);
      newPentagram.musicians = MusicianBuilder.fromList(json.musicians);
      newPentagram.planks = PlankBuilder.fromList(json.planks);
      newPentagram.config = ConfigBuilder.fromJson(json.config);
      return newPentagram;
    }
    return null;
  }
}

class PlankBuilder {
  static fromJson(json) {
    return (json)
      ? new Plank(
        json.id,
        json.color,
        json.sound
      )
      : null;
  }

  static fromList(list): Plank[] {
    return (Array.isArray(list)) ? mapCollection(PlankBuilder.fromJson, list) : [];
  }
}

class MusicianBuilder {
  static fromJson(json) {
    return (json)
      ? new Musician(
        json.id,
        json.color,
        json.playingSide
      )
      : null;
  }

  static fromList(list): Musician[] {
    return (Array.isArray(list)) ? mapCollection(MusicianBuilder.fromJson, list) : [];
  }
}

class BeatBuilder {
  static fromJson(json) {
    return (json)
      ? new Beat(
        json.time,
        json.plank,
        json.isUp,
        json.musician,
        json.color,
      )
      : null;
  }

  static fromList(list): Beat[] {
    return (Array.isArray(list)) ? mapCollection(BeatBuilder.fromJson, list) : [];
  }
}

class ConfigBuilder {
  static fromJson(json) {
    if (json) {
      const newConfig = new Config();
      newConfig.duration = json.duration;
      newConfig.playSpeed = json.playSpeed;
      newConfig.beatsPerCompass = json.beatsPerCompass;
      newConfig.rhythmicalWeight = json.rhythmicalWeight;
      newConfig.playbackStart = json.playbackStart;
      return newConfig;
    }
  }
}
