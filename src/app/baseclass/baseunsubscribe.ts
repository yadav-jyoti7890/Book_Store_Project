import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class BaseUnsubscribe implements OnDestroy {
  protected destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
