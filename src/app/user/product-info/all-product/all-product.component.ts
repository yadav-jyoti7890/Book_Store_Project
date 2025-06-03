import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { product } from '../product-interface/product-interface';
import { GetbooksService } from '../product-services/getbooks.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedServiceService } from '../product-services/shared-service.service';
import { FormControl, FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { response } from 'express';
import { LoaderBase } from '../../../loader/loader';
import { ViewDetailService } from '../../view-info/view-services/view-detail.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StarRatingPipe } from '../../pipes/star-rating.pipe';
import { CountingService } from '../../centralize-services/counting.service';

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterLink,
    FormsModule,
    RouterOutlet,
    FormsModule,
    StarRatingPipe
  ],
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
  public productId!: number;
  showFeedbackPopup: boolean = false;
  commit: string = '';
  rating: number = 0;
  userOrder: any;

  ngOnInit(): void {
    this.getAllBooks();
    this.loadWishlist();
    this.getAllOrder();
    this.sharedService.resetSearch$.subscribe((shouldReset) => {
      if (shouldReset) {
        this.searchText = '';
        this.getAllBooks();
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
    private snackBar: MatSnackBar,
    private counting: CountingService
  ) {
    super();
  }

  private getAllOrder() {
    this.productService.getAllOrders(this.userId).subscribe({
      next: (res) => {
        // //console.log()(res);
        const orders = res.getOrders;
        const deliveredProductIds = orders
          .filter((order: any) => order.order_status === 'Delivered')
          .map((order: any) => order.product_id);

        // //console.log()('Delivered Product IDs:', deliveredProductIds);
        this.product = this.product.map((prod) => ({
          ...prod,
          order_status: deliveredProductIds.includes(prod.product_id)
            ? 'Delivered'
            : 'Not Delivered',
        }));

        // //console.log()(
        //   this.product,
        //   '✅ Updated product list with delivery status'
        // );
      },
    });
  }

  private getAllBooks() {
    this.showLoader();
    this.productService.receivebooks().subscribe((response) => {
       this.hideLoader();
      this.product = response.data;
      console.log(this.product, "product");
      // this.getAllOrder();
     
    });
  }

  private getCategoryFromSharedService() {
    this.showLoader();
    this.sharedService.filteredProducts$.subscribe((data) => {
      this.getAllOrder();
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
    this.getAllOrder();
    this.productService.applySearchFilter(search).subscribe({
      next: (response) => {
        this.hideLoader();
        this.product = response.searchData;
      },
    });
  }

  public toggleWishlist(bookId: number) {
    const isWishListed = this.wishlistBookIds.includes(bookId);

    if (isWishListed) {
      //console.log()(isWishListed);
      this.productService.removeWishList(this.userId, bookId).subscribe(
        () => {
          this.wishlistBookIds = this.wishlistBookIds.filter(
            (id) => id !== bookId
          );
          this.counting.removeFromWishlist()
          //console.log()('Removed from wishlist:', bookId);
        },
        (error) => {
          console.error('Error removing from wishlist:', error);
        }
      );
    } else {
      this.productService.addWishList(this.userId, bookId).subscribe(
        () => {
          this.wishlistBookIds.push(bookId);
           this.counting.addToWishlist()
          //console.log()('Added to wishlist:', bookId);
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
        this.getAllOrder();
        this.wishlistBookIds = bookIds;
        //console.log()('Wishlist loaded:', this.wishlistBookIds);
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
        //console.log()('add');
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

  private add_cart_count() {
    this.count.postMessage({ type: 'add_cart_count' });
  }

  // private wishListCount() {
  //   this.count.postMessage({ type: 'wishListCount' });
  // }

  public openFeedback(product_id: number) {
    this.showFeedbackPopup = true;
    this.productId = product_id;
  }

  public closeFeedback() {
    this.showFeedbackPopup = false;
    this.commit = '';
    this.rating = 0;
  }

  public submitFeedback(): void {
    if (this.commit && this.rating > 0 && this.productId != null) {
      //console.log()('Feedback submitted for product ID:', this.productId);
      //console.log()('Rating:', this.rating);
      //console.log()('Comment:', this.commit);

      const feedback = {
        userId: this.userId,
        productId: this.productId,
        commit: this.commit,
        rating: this.rating,
      };
      this.productService.submitFeedback(feedback).subscribe({
        next: (response) => {
          alert('Thank you for your feedback!');
          this.closeFeedback();
        },
      });
    } else {
      alert('Please enter feedback and select rating.');
    }
  }

  public feedback(value: number) {
    this.rating = value;
  }
}
