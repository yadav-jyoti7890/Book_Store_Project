import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AddCartService } from '../add-cart-services/add-cart.service';
import { response } from 'express';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment.prod';
import { CountingService } from '../../centralize-services/counting.service';

@Component({
  selector: 'app-add-cart',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './add-cart.component.html',
  styleUrl: './add-cart.component.css',
})
export class AddCartComponent implements OnInit {
  public select_Address: any;
  public user_id!: number;
  public item: any;
  public total_amount: any[] = [];
  public totalItemsCount: any;
  public cartItems: any[] = [];
  public sum: number = 0;
  public user_address: any;
  public address_data: any[] = [];
  public pop_up: boolean = false;
  public order_item: any[] = [];
  public total_item: number = 0;
  public address_id: any;
  public order_id: any;
  public cartData: any;
  public showAddressForm = false;
  public imageBaseUrl = environment.BaseUrl;
  quantity: number = 1;

  private count = new BroadcastChannel('count');

  ngOnInit(): void {
    this.allcartdata();
    this.alluseraddress();
    this.user_id = Number(localStorage.getItem('user_id'));
  }

  constructor(
    private add_cart: AddCartService,
    private location: Location,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private removeCartCounting: CountingService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddressForm = this.router.url.includes('/add_cart/address');
      }
    });
  }

  allcartdata() {
    this.user_id = Number(localStorage.getItem('user_id'));
    if (this.user_id) {
      this.add_cart
        .getAllProduct(this.user_id)
        .subscribe((response: { data: any }) => {
          this.item = response.data;
          this.user_address = localStorage.getItem('user_address');

          this.item.forEach((value: any) => {
            this.sum = this.sum + value.total_amount;
            this.total_item += 1;
          });
        });
    }
  }

  removeToCart(id: number) {
    this.add_cart.deleteCartItem(id).subscribe(
      (data) => {
        this.allcartdata();
        this.removeCartCounting.removeToCart();
        this.snackBar.open('remove item from the cart ✅', 'close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['add-cart']);
      },
      (err) => {
        this.snackBar.open('remove item error from the cart ❌', 'close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

  alluseraddress() {
    this.add_cart.getuseraddress(this.user_id).subscribe((response) => {
      if (response.data) {
        this.address_data = response.data;
        this.select_Address = response.data[0];
        this.router.navigate(['/add_cart']);
      }
    });
  }

  popup() {
    // // console.log("popup")
    this.pop_up = !this.pop_up;
    //  // console.log(this.pop_up)
  }

  selectAddress(address: any) {
    this.select_Address = address;
  }

  change_address() {
    this.pop_up = false;
  }

  confirmOrder() {
    const payload = {
      order_data: {
        address_id: this.select_Address.address_id,
        user_id: this.user_id,
        total_item: this.total_item,
        total_amount: this.sum,
      },
      order_items: this.item, // Array of { product_id, price, quantity }
      user_id: this.user_id,
    };

    this.add_cart.confirm_Order(payload).subscribe({
      next: (res) => {
        // console.log('Order + items saved + cart cleared:', res);
        this.snackBar.open('Order Confirmed Successfully', 'close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.removeCartCounting.removeToCart();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Order confirmation failed:', err);
      },
    });
  }

  add(data: any) {
    // console.log('add', data);
    if (data.quantity < 10) {
      data.quantity += 1;
    }
  }

  substract(data: any) {
    // console.log('minus', data);
    if (data.quantity > 1) {
      data.quantity -= 1;
    }
  }

  openAddress() {
    this.showAddressForm = true; // Show the address form overlay
    this.router.navigate(['/add_cart/address']);
  }

  closeAddress() {
    this.showAddressForm = false;
    this.router.navigate(['/add_cart']); // Navigate back to cart after closing
  }
}
