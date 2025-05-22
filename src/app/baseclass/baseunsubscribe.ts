// base-unsubscriber.ts
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

export abstract class BaseUnsubscribe {
  protected destroy$ = new Subject<void>();

  protected OnDestroy(): void {
    console.log("unSubscribe", this.destroy$)
    this.destroy$.next();
    this.destroy$.complete();
  }
}

