import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetstorageitemService {

  constructor() { }

    getUserId(): string | null {
    return localStorage.getItem('user_id');
  }
}
