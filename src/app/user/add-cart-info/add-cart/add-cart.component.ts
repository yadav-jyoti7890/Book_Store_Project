import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AddCartService } from '../add-cart-services/add-cart.service';
import { response } from 'express';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-add-cart',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule,RouterOutlet,RouterLinkActive],
  templateUrl: './add-cart.component.html',
  styleUrl: './add-cart.component.css'
})
export class AddCartComponent implements OnInit {
  select_Address: any;
  user_id: any
  item: any;
  total_amount: any[] = [];
  totalItemsCount: any;
  cartItems: any[] = [];
  sum: number = 0;
  user_address: any;
  address_data: any[] = [];
  pop_up: boolean = false;
  order_item: any[] = [];
  total_item: number = 0;
  address_id: any;
  order_id: any;
  cartData: any;
  showAddressForm = false;
  imageBaseUrl = environment.BaseUrl;

  private count = new BroadcastChannel('count');

  ngOnInit(): void {
    this.allcartdata();
    this.alluseraddress()
  }

  constructor(private add_cart: AddCartService, private location: Location, private router: Router,private dialog: MatDialog,private snackBar:MatSnackBar) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showAddressForm = this.router.url.includes('/add_cart/address');
      }
    });
   }

    
  allcartdata() {
    this.user_id = localStorage.getItem('user_id');
    //  console.log(this.user_id)
    if (this.user_id) {
      this.add_cart.getAllProduct(this.user_id).subscribe((response: { data: any; }) => {
        this.item = response.data;
        console.log(this.item)
        this.user_address = localStorage.getItem('user_address')

        this.item.forEach((value: any) => {
          this.sum = this.sum + value.total_amount;
          this.total_item += 1;
          console.log(this.sum);
          
        });


        console.log(this.total_amount)
        console.log(this.item, "addcartpage")

      }, (error) => {
        alert("data nhi mila")
      })
    }
  }

  removeToCart(id: number) {
    console.log(id)
    this.add_cart.deleteCartItem(id).subscribe((data) => {
      this.allcartdata();
      this.add_cart_count();
      this.snackBar.open('remove item from the cart ✅', 'close', {duration: 3000, horizontalPosition:'center', verticalPosition:'top'})
      this.router.navigate(['add-cart'])
    }, (err) => {
      this.snackBar.open('remove item error from the cart ❌', 'close', {duration: 3000, horizontalPosition:'center', verticalPosition:'top'})
    })
  }

  add_cart_count() {
    console.log('User logout up!');
    this.count.postMessage({ type: 'add_cart_count'});
  }
  

  alluseraddress() {
    this.add_cart.getuseraddress(this.user_id).subscribe((response) => {
      if (response.data) {
        this.address_data = response.data;
        // console.log(this.address_data,"pura")
        this.select_Address = response.data[0]
        // console.log(this.select_Address,"ek")
        this.router.navigate(['/add_cart'])
      }
      // alert("user address is existing on address table you want to add more address")
    }, (error) => {
      // alert("user address is not existing on address table you want to add more address")
    })
  }

  popup() {
    // console.log("popup")
    this.pop_up = !this.pop_up;
    //  console.log(this.pop_up)
  }

  selectAddress(address: any) {
    this.select_Address = address;
  }

  change_address() {
    console.log(this.select_Address, "change address")
    this.pop_up = false;
  }

  //  confirmOrder() {
  //   console.log("confirm order")
  //   this.address_id = this.select_Address.address_id
  //   console.log(this.address_id,this.user_id,this.total_item,this.sum,this.item)
  //   const order_data = {
  //     address_id:this.address_id,
  //     user_id:this.user_id,
  //     total_item:this.total_item,
  //     total_amount : this.sum
  //   }

  //   this.order_item = this.item;

  //   console.log(order_data,this.order_item)
  //   forkJoin([
  //     this.add_cart.confirm_Order(order_data),   // Confirm order request
  //     this.add_cart.order_item(this.address_id,this.order_item)  // Order item request
  //   ]).subscribe((response)=>{},(error)=>{})
  // }

  confirmOrder() {
    console.log("confirm order");
    this.address_id = this.select_Address.address_id;
    console.log(this.address_id, this.user_id, this.total_item, this.sum, this.item);
    const order_data = {
      address_id: this.address_id,
      user_id: this.user_id,
      total_item: this.total_item,
      total_amount: this.sum,
    };
    
    const order_item_data = {
      address_id: this.address_id,
      user_id: this.user_id,
    };
  
    this.order_item = this.item;
   
    console.log("order data ====>",order_data, order_item_data, this.order_item);
    
    this.add_cart.confirm_Order(order_data).subscribe(
      (response) => {
        this.order_id = response.order_id;
        console.log("Order confirmed:", response, "order_id", this.order_id);
        
        this.add_cart.order_item(this.order_id, this.order_item).subscribe((response) => {
            this.user_id = localStorage.getItem('user_id');
            this.add_cart.deleteAllCartData(this.user_id).subscribe(
              (response) => {
                this.snackBar.open('Order Confirmed Successfully', 'close', {duration: 3000, horizontalPosition:'center', verticalPosition:'top'})
                this.add_cart_count();
                this.router.navigate(['/home'])
              }, (error) => {
                  console.error("delete items from add cart")
              })
          },
          (error) => {
            console.error("Error while adding order items:", error);
          }
        );
      },

      (error) => {
        console.error("Error while confirming order:", error);
      }
    )

  }

  // confirmOrder(){
  //   console.log(this.item, "my_order")
  //   this.add_cart.my_Order(this.item).subscribe((response)=>{

  //  },(error)=>{

  //  })
  // }

  // confirmOrder(){
  //   this.user_id = localStorage.getItem('user_id');
  //   this.add_cart.deleteAllCartData(this.user_id).subscribe((response)=>{
  //     window.location.reload();
  //   },(error)=>{})
  // }

  // ngAfterViewInit(): void {
  //   let cart_img = document.querySelector('#cart_img')
  //   gsap.from(cart_img, {
  //     // y:100,
  //     opacity: 0,
  //     duration: 1
  //   })
  //   throw new Error('Method not implemented.');
  // }


  openAddress() {
    this.showAddressForm = true;  // Show the address form overlay
    this.router.navigate(['/add_cart/address']);
  }

  closeAddress() {
    this.showAddressForm = false;
    this.router.navigate(['/add_cart']);  // Navigate back to cart after closing
  }


}


