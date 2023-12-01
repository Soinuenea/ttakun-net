import { Pentagram } from './pentagram';

export class Penta {
  constructor(
    public hash?: string,
    public name?: string,
    public level?: number,
    public rhythm?: string,
    public general?: boolean,
    public pentagram?: Pentagram,
  ) { }

  clone() {
    return new Penta(
      this.hash,
      this.name,
      this.level,
      this.rhythm,
      this.general,
      this.pentagram
    );
  }

  get pentaName() {
    return this.general ? this.name : this.level ? `${ this.level }.${ this.rhythm }.${ this.name }` : `${ this.rhythm }.${ this.name }`;
  }
}
