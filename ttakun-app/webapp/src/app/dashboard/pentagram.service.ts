import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Pentagram } from '../core/models/pentagram';
import { PentagramApiService } from '../core/services/api/pentagram-api.service';
import { UserApiService } from '../core/services/api/user-api.service';
import { ResolverService } from '../core/services/base/resolver.service';

@Injectable({
  providedIn: 'root'
})
export class PentagramService {
  initialPentagram: BehaviorSubject<Pentagram> = new BehaviorSubject<Pentagram>(new Pentagram());
  currentPentagram: BehaviorSubject<Pentagram> = new BehaviorSubject<Pentagram>(new Pentagram());
  currentPentagramTitle: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  selectedMusicianIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectedPlankIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectedHitStrength: BehaviorSubject<number> = new BehaviorSubject<number>(100);
  selectedStartOfPlaybackPercent: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectedSpeed: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  hasUnsavedData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private pentagramApiService: PentagramApiService,
    private resolverService: ResolverService,
    private userApiService: UserApiService
  ) { }


  updateInitialPentagram(newPentagram: Pentagram) {
    this.initialPentagram.next(newPentagram);
  }

  updateCurrentPentagram(newPentagram: Pentagram) {
    const hasUnsavedData = JSON.stringify(this.initialPentagram.value) !== JSON.stringify(newPentagram);
    this.hasUnsavedData.next(hasUnsavedData);
    this.currentPentagram.next(newPentagram);
  }

  updateSelectedMusicianIndex(newIndex: number) {
    this.selectedMusicianIndex.next(newIndex);
  }

  updateSelectedPlankIndex(newIndex: number) {
    this.selectedPlankIndex.next(newIndex);
  }

  updateSelectedHitStrength(newIndex: number) {
    this.selectedHitStrength.next(newIndex);
  }

  updateSelectedStartOfPlaybackPercent(newIndex: number) {
    this.selectedStartOfPlaybackPercent.next(newIndex);
  }

  updateSelectedSpeed(newIndex: number) {
    this.selectedSpeed.next(newIndex);
  }

  updateCurrentPentagramTitle(pentagramTitle: string) {
    this.currentPentagramTitle.next(pentagramTitle);
  }

  updateLanguage(language: string) {
    return this.userApiService.updateLanguage(language).toPromise();
  }

  savePentagram(data: any, pentagram: Pentagram) {
    return this.pentagramApiService.savePentagram(data, pentagram);
  }

  getPentagrams() {
    return this.pentagramApiService.getPentagrams();
  }

  resolvePentagrams() {
    this.resolverService.onResolverStart();
    return this.getPentagrams()
      .pipe(
        catchError(this.onPentagrmasResolveError),
        finalize(this.resolverService.onResolverStop)
      );
  }

  getPentagram(hash: string) {
    return this.pentagramApiService.getPentagram(hash);
  }

  resolvePentagram(hash: string) {
    this.resolverService.onResolverStart();
    return this.getPentagram(hash)
      .pipe(
        catchError(this.onPentagrmaResolveError),
        finalize(this.resolverService.onResolverStop)
      );
  }

  private onPentagrmasResolveError = () => this.resolverService
  .onResolverError('/', 'error.pentagrams_not_found');

  private onPentagrmaResolveError = () => this.resolverService
  .onResolverError('/', 'error.pentagram_not_found');

}
