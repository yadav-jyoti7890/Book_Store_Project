import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { product } from '../product-interface/product-interface';
import { GetbooksService } from '../product-services/getbooks.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedServiceService } from '../product-services/shared-service.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { response } from 'express';
import { LoaderBase } from '../../../loader/loader';
import { ViewDetailService } from '../../view-info/view-services/view-detail.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLink, FormsModule, RouterOutlet],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css',
})
export class AllProductComponent extends LoaderBase {
    private wishLis = new BroadcastChannel('wishListCount');
  public imageBaseUrl = environment.BaseUrl;
  public product: product[] = [];
  public searchText = '';
  private searchSubject = new Subject<string>();
  public isWishListed: boolean = false;
  private userId = Number(localStorage.getItem('user_id'));
  public wishlistBookIds: number[] = [];
  private count = new BroadcastChannel('count');

  ngOnInit(): void {
    this.getallbooks();
    this.loadWishlist();
    this.sharedService.resetSearch$.subscribe((shouldReset) => {
      if (shouldReset) {
        this.searchText = '';
        this.getallbooks();
      }
    });

    this.getCategoryFromSharedService();
    this.searchSubject.pipe(debounceTime(300)).subscribe((search) => {
      this.fetchResults(search);
    });
  }

  constructor(
    private productService: GetbooksService,
    private sharedService: SharedServiceService,
    private viewService: ViewDetailService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  private getallbooks() {
    this.showLoader();
    this.productService.receivebooks().subscribe((response) => {
      this.hideLoader();
      // console.log(response, "all pro");

      this.product = response.data;
      // console.log(this.product)
    });
  }

  private getCategoryFromSharedService() {
    this.showLoader();
    this.sharedService.filteredProducts$.subscribe((data) => {
      if (data && data.length > 0) {
        this.hideLoader();
        this.product = data;
      } else {
        this.product = [];
      }
    });
  }

  public applyFilter() {
    this.searchSubject.next(this.searchText);
  }

  private fetchResults(search: string) {
    this.showLoader();
    this.productService.applySearchFilter(search).subscribe({
      next: (response) => {
        this.hideLoader();
        this.product = response.searchData;
      },
    });
  }

  public toggleWishlist(bookId: number) {
    const isWishListed = this.wishlistBookIds.includes(bookId);
     console.log(isWishListed);
     
    if (isWishListed) {
      console.log(isWishListed)
      this.productService.removeWishList(this.userId, bookId).subscribe(
        () => {
          this.wishlistBookIds = this.wishlistBookIds.filter(
            (id) => id !== bookId
          );
          this.wishListCount();
          console.log('Removed from wishlist:', bookId);
        },
        (error) => {
          console.error('Error removing from wishlist:', error);
        }
      );
    } else {
      this.productService.addWishList(this.userId, bookId).subscribe(
        () => {
          this.wishlistBookIds.push(bookId);
           this.wishListCount();
          console.log('Added to wishlist:', bookId);
        },
        (error) => {
          console.error('Error adding to wishlist:', error);
        }
      );
    }
  }

  private loadWishlist() {
    this.productService
      .getWishlist(this.userId)
      .subscribe((bookIds: number[]) => {
        this.wishlistBookIds = bookIds;
        console.log('Wishlist loaded:', this.wishlistBookIds);
      });
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
    this.viewService.addToCart(addtobook).subscribe(
      (data) => {
        this.snackBar.open('add to cart successfully', 'close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.add_cart_count();
        console.log('add');
      },
      (error) => {
        this.snackBar.open('not add inside the cart', 'close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  add_cart_count() {
    // console.log('User logout up!');
    this.count.postMessage({ type: 'add_cart_count' });
  }

  wishListCount(){
     this.count.postMessage({ type: 'wishListCount' });
  }


}
