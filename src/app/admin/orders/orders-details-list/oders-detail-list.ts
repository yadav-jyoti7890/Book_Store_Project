import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../../admin-service/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { ItemServiceService } from '../../../admin-service/item-service.service';
// import { ItemServiceService } from '../../admin-service/item-service.service';

@Component({
  selector: 'app-orders-detail-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-detail-list.html',
  styleUrl: './orders-detail-list.css'
})
export class OrdersDetailListComponent implements OnInit{
  orderData: any;
  order_id: number | undefined | any;
  user_items:items[] = [];
  
   constructor(private itermService:ItemServiceService, private router:Router, private route:ActivatedRoute){}


  ngOnInit(): void {
   
    this.route.paramMap.subscribe((params)=>{
          const order_id = params.get('id');
          console.log(order_id, "order_id")
          if(order_id){
            this.order_id = parseInt(order_id);
            console.log(this.order_id)
          }
        })
        this.items();
  }


  items(){
    debugger
    this.itermService.user_items(this.order_id).subscribe((response)=>{
      this.user_items = response.items;
      console.log(this.user_items,"user items")
    },(error)=>{})
  }

}


export interface items {
 image:string;
 user_name:string;
 quantity:number;
 price:number;
 total_amount:number;
 total_item:number;
 city:string;
 state:string;
 contact:number;
 pincode:number;
 house_no:string;
 road_name:string;
 full_name:string;
 random_number:number;
 total_pay:number;
}
