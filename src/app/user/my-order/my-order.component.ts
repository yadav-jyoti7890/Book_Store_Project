import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AddCartService } from '../../user_service/add-cart.service';
import { response } from 'express';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [RouterLink,CommonModule,DatePipe,RouterOutlet,RouterLinkActive],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css'
})
export class MyOrderComponent implements OnInit{
  user_id:any;
  items: any;
  getData: any;
  status: any;
  user_items: Date | undefined | any;
  orderDetails: any;
  uniqueOrderIds: any[] = [];  
  selectedOrderDetails: any = null;
  ngOnInit(): void {
    this.getItems();
  }

  constructor(private addCart:AddCartService){}

getItems(){
 this.user_id = localStorage.getItem('user_id');
  this.addCart.getUserItems(this.user_id).subscribe((response)=>{
  this.user_items = response.UserItems;
  this.extractUniqueOrderIds(); 
  console.log("useritems", this.user_items)
  },(error)=>{})
}

extractUniqueOrderIds() {
  const orderIdMap = new Map();  

  this.user_items.forEach((order: any) => {
    if (!orderIdMap.has(order.random_number)) {
      orderIdMap.set(order.random_number, {
        order_id: order.order_id,
        order_date: order.order_date,
        estimate_delivery_date: order.estimate_date,
        full_name: order.full_name,
        total_item : order.total_item,
        order_status : order.order_status,
        total_pay : order.total_pay
      });
    }
  });

  this.uniqueOrderIds = Array.from(orderIdMap, ([random_number, details]) => ({
    random_number,
    ...details
  }));

}
}
