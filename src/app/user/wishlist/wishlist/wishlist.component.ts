import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist-service/wishlist.service';
import { environment } from '../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { ViewDetailService } from '../../view-info/view-services/view-detail.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private userId = Number(localStorage.getItem('user_id'));
  private count = new BroadcastChannel('count');
  public imageBaseUrl = environment.BaseUrl;
  public wishlistBooks: any;

  constructor(
    private wishlistService: WishlistService,
    private snackBar: MatSnackBar,
    private viewService: ViewDetailService
  ) {}

  ngOnInit(): void {
    this.loadWishlistBooks();
  }


  loadWishlistBooks() {
    this.wishlistService
      .getWishlistBooks(this.userId)
      .subscribe((books: any[]) => {
        this.wishlistBooks = books;
      });
  }

  public Remove(product:any){
    console.log(this.userId, product.product_id)
    this.wishlistService.removeWishListItems(this.userId, product.product_id).subscribe({
      next: (response) =>{
        if(response){
          this.wishListCount()
          this.snackBar.open('remove item from the cart ✅', 'close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
       this.loadWishlistBooks();
        }
      }
    })
  }

  public addCart(product: any) {
    let user_id = localStorage.getItem('user_id');
    const addtobook = {
      title: product.title,
      description: product.description,
      user_id: user_id,
      book_id: product.product_id,
      price: product.price,
      image: product.image,
    };
    this.viewService.addToCart(addtobook).subscribe({
      next: (data) => {
        this.snackBar.open('add to cart successfully', 'close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.add_cart_count();
        console.log('add');
      },
    });
  }

  add_cart_count() {
    console.log('User logout up!');
    this.count.postMessage({ type: 'add_cart_count' });
  }

    wishListCount(){
     this.count.postMessage({ type: 'wishListCount' });
  }


}
