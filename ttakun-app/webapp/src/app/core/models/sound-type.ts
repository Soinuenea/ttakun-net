export class SoundType {
  constructor(
    public value?: string,
    public label?: string,
  ) { }

  clone() {
    return new SoundType(
      this.value,
      this.label
    );
  }
}
