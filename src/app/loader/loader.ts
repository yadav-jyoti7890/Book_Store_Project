// loader-base.ts
import { signal, WritableSignal } from '@angular/core';
import { Subject } from 'rxjs';

export class LoaderBase {
 

  protected destroy$ = new Subject<void>();
  static loaderSignal: WritableSignal<boolean> = signal(false);
  private static showTime = 0;
  private static minTime = 400;

     protected OnDestroy(): void {
    console.log("unSubscribe", this.destroy$)
    this.destroy$.next();
    this.destroy$.complete();
  }

  showLoader() {
    LoaderBase.showTime = Date.now();
    LoaderBase.loaderSignal.set(true);
  }

  hideLoader() {
    const elapsed = Date.now() - LoaderBase.showTime;
    const delay = LoaderBase.minTime - elapsed;

    if (delay > 0) {
      setTimeout(() => LoaderBase.loaderSignal.set(false), delay);
    } else {
      LoaderBase.loaderSignal.set(false);
    }
  }

  isLoading() {
    return LoaderBase.loaderSignal();
  }

  static getSignal() {
    return LoaderBase.loaderSignal;
  }
}
