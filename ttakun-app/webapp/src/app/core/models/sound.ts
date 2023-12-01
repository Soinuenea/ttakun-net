export class Sound {
  constructor(
    public hash?: string,
    public type?: string,
    public note?: string,
    public path?: string,
  ) { }

  clone() {
    return new Sound(
      this.hash,
      this.type,
      this.note,
      this.path,
    );
  }
}
