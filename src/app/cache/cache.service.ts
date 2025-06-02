import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

   private cache = new Map<string, any>();

  set(key: string, value: any): void {
    // console.log('[Cache SET] Key:', key);
    // console.log(' [Stored Value]:', value);
    this.cache.set(key, value);
  }

  get(key: string): any | null {
    const value = this.cache.get(key);
    // console.log(' [Cache GET] Key:', key, '| Value:', value);
    return value ?? null;
  }

  logAll(): void {
    // console.log(' [Full Cache Contents]');
    for (let [key, value] of this.cache.entries()) {
      // console.log(` Key: ${key}`, value);
    }
  }
}
