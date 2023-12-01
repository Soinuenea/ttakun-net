import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PendingService } from '../../core/services/base/pending.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  blocking$: Observable<boolean>;

  constructor(
    private pendingService: PendingService
  ) { }

  ngOnInit() {
    this.blocking$ = this.pendingService.isBlockingPending.asObservable();
  }
}
