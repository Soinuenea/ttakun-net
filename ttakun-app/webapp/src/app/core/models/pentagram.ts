export class Pentagram {
  observations?: string = '';
  planks?: Plank[] = [
    new Plank(1, '#000000', new PlankSound('OHOL_HANDIAK', '1A')),
  ];
  musicians?: Musician[] = [new Musician(1, '#000000', 'top')/*, new Musician(2, '#F0B129', 'bottom')*/];
  beats?: Beat[] = [];
  config?: Config = new Config();

  constructor(
    observations?: string,
    planks?: Plank[],
    musicians?: Musician[],
    beats?: Beat[],
    config?: Config
  ) { }
}

// Subclasses

export class Beat {
  time?: number;
  plank?: number;
  musician?: number;
  hitStrength?: number;
  isUp?: boolean;
  color?: string;

  constructor(time?: number, plank?: number, isUp?: boolean, musician?: number, color?: string) {
    this.time = time;
    this.plank = plank;
    this.isUp = isUp;
    this.musician = musician;
    this.color = color;
  }
}

export class Musician {
  id?: number;
  color?: string = '#000000';
  playingSide?: 'top' | 'bottom' = 'top';
  mute?: boolean = false;

  constructor(id?: number, color?: string, playingSide?: 'top' | 'bottom') {
    this.id = id;
    this.color = color;
    this.playingSide = playingSide;
  }
}

export class Plank {
  id?: number;
  color?: string = '#000000';
  sound?: PlankSound;

  constructor(id?: number, color?: string, sound?: PlankSound) {
    this.id = id;
    this.color = color;
    this.sound = sound;
  }
}

export class PlankSound {
  type?: string = '';
  note?: string = '';

  constructor(type?: string, note?: string) {
    this.type = type;
    this.note = note;
  }
}

export class Config {
  duration?: number = 10000;
  playSpeed?: number = 1;
  beatsPerCompass?: number = 8;
  rhythmicalWeight?: number = 100; // ??
  playbackStart?: number; // ??

  constructor(
    duration?: number,
    playSpeed?: number,
    beatsPerCompass?: number, // ??
    rhythmicalWeight?: number, // ??
    playbackStart?: number // ??
  ) { }
}
