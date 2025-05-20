import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AddCartService } from '../../add-cart-info/add-cart-services/add-cart.service';
import { response } from 'express';
import { DatePipe } from '@angular/common';
import { UserOrdersDetailsService } from '../user-order-detail-services/user-orders-details.service';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe, RouterOutlet, RouterLinkActive],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.css',
})
export class MyOrderComponent implements OnInit {
  public user_id! : number;
  public items: any;
  public getData: any;
  public status: any;
  public user_items: Date | undefined | any;
  public orderDetails: any;
  public uniqueOrderIds: any[] = [];
  public selectedOrderDetails: any = null;

  ngOnInit(): void {
    this.getItems();
  }

  constructor(private userOrderService: UserOrdersDetailsService) {}

  getItems() {
    this.user_id = Number(localStorage.getItem('user_id'))
    this.userOrderService.getUserItems(this.user_id).subscribe(
      (response) => {
        this.user_items = response.UserItems;
        this.extractUniqueOrderIds();
        console.log('useritems', this.user_items);
      },
      (error) => {}
    );
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
          total_item: order.total_item,
          order_status: order.order_status,
          total_pay: order.total_pay,
        });
      }
    });

    this.uniqueOrderIds = Array.from(
      orderIdMap,
      ([random_number, details]) => ({
        random_number,
        ...details,
      })
    );
  }
}
