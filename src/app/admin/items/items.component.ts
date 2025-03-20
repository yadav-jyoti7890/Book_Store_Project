import { Component } from '@angular/core';
import { OrderService } from '../../admin-service/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  orderData: any;
  order_id: number | undefined | any;
  user_items:items[] = [];
  
   constructor(private orderService: OrderService,private router:Router, private route:ActivatedRoute){}
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
    this.orderService.user_items(this.order_id).subscribe((response)=>{
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
