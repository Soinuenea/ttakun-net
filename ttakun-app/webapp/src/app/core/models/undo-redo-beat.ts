import { Beat } from './pentagram';

export class UndoRedoBeat {
  constructor(
    public action?: string,
    public beats?: Beat[],
  ) { }

  clone() {
    return new UndoRedoBeat(
      this.action,
      this.beats,
    );
  }
}
