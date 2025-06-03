import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountingService {
 private cartCount = new BehaviorSubject<number>(0);
  private wishlistCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();
  wishlistCount$ = this.wishlistCount.asObservable();

  
  addToWishlist() {
    this.wishlistCount.next(this.wishlistCount.value + 1);
  }

  removeFromWishlist() {
    this.wishlistCount.next(Math.max(0, this.wishlistCount.value - 1));
  }

}
