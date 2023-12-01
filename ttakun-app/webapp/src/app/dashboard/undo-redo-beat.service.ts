import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Beat } from '../core/models/pentagram';
import { UndoRedoBeat } from '../core/models/undo-redo-beat';

@Injectable({
  providedIn: 'root'
})
export class UndoRedoBeatService {
  currentUndoRedoBeat: BehaviorSubject<{undoRedoBeat: UndoRedoBeat; type: string}> =
    new BehaviorSubject<{undoRedoBeat: UndoRedoBeat; type: string}>(null);
  currentUndoRedoBeatSave: BehaviorSubject<UndoRedoBeat[]> = new BehaviorSubject([]);
  currentUndoRedoBeatDisplay: BehaviorSubject<UndoRedoBeat[]> = new BehaviorSubject([]);
  currentUndoRedoBeatCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentCanRedo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  add(action: string, beats: Beat[]) {
    const count = this.currentUndoRedoBeatCount.value;
    this.currentUndoRedoBeatCount.next(count + 1);

    const index = this.currentUndoRedoBeatDisplay.value.length;
    const saveCount = this.currentUndoRedoBeatSave.value.length;

    const undoRendoBeatSave = [...this.currentUndoRedoBeatSave.value];
    undoRendoBeatSave.splice(index, saveCount);

    const undoRendoBeatDisplay = [...this.currentUndoRedoBeatDisplay.value];

    const newUndoRedoBeat = new UndoRedoBeat(action, beats);
    undoRendoBeatDisplay.push(newUndoRedoBeat);
    undoRendoBeatSave.push(newUndoRedoBeat);

    this.currentUndoRedoBeatSave.next(undoRendoBeatSave);
    this.currentUndoRedoBeatDisplay.next(undoRendoBeatDisplay);

    this.currentCanRedo.next(false);
  }

  undo() {
    const count = this.currentUndoRedoBeatCount.value;

    if (count === 0) {
      return;
    }

    this.currentUndoRedoBeatCount.next(count - 1);

    const undoRendoBeatDisplay = [...this.currentUndoRedoBeatDisplay.value];
    const undoRedoBeat = undoRendoBeatDisplay.pop();

    this.currentUndoRedoBeatDisplay.next(undoRendoBeatDisplay);

    const type = 'undo';
    this.currentUndoRedoBeat.next({undoRedoBeat, type});

    this.currentCanRedo.next(true);
  }

  redo() {
    if (!this.currentCanRedo.value) {
      return;
    }

    const undoRendoBeatSave = [...this.currentUndoRedoBeatSave.value];
    const undoRendoBeatDisplay = [...this.currentUndoRedoBeatDisplay.value];

    const count = this.currentUndoRedoBeatCount.value;
    this.currentUndoRedoBeatCount.next(count + 1);

    const displayLength = this.currentUndoRedoBeatDisplay.value.length;
	  const undoRedoBeat = undoRendoBeatSave[displayLength];

    undoRendoBeatDisplay.push(undoRedoBeat);

    this.currentUndoRedoBeatDisplay.next(undoRendoBeatDisplay);
    const type = 'redo';
    this.currentUndoRedoBeat.next({undoRedoBeat, type});

    this.currentCanRedo.next(undoRendoBeatDisplay.length !== undoRendoBeatSave.length);
  }

  reset() {
    this.currentUndoRedoBeat.next(null);
    this.currentUndoRedoBeatSave.next([]);
    this.currentUndoRedoBeatDisplay.next([]);
    this.currentUndoRedoBeatCount.next(0);
    this.currentCanRedo.next(false);
  }

}
