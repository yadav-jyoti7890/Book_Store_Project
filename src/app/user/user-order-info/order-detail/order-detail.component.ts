import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddCartService } from '../../add-cart-info/add-cart-services/add-cart.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Box, Calendar, CheckCircle, Loader, LucideAngularModule, Truck } from 'lucide-angular';
import { response } from 'express';


@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule,DatePipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit{
  orderDetails: any;
  order_id:any | string | null;
  user_items: any;
  order_details:any;
  
  
  constructor( private route: ActivatedRoute,private activate: ActivatedRoute, private addService:AddCartService){}
  ngOnInit(): void {
    this.activate.paramMap.subscribe((paramp) => {
      const order_id = paramp.get('id')
      console.log(order_id, "book_id");
      if (order_id) {
        this.order_id = parseInt(order_id);
        console.log("order id", order_id);
        this. getOrderDetail();
      }
    })
  }

  getOrderDetail(){
     this.addService.orderDetailFetch(this.order_id).subscribe((response)=>{
     this.order_details = response.UserItems;
     console.log(this.order_details,"order")
     },(error)=>{

     })
  }

 

 
}


