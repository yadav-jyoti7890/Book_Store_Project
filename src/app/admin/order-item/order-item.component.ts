import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../admin-service/order.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})
export class OrderItemComponent implements OnInit {

  orderData:any;
  order_id: number | undefined | any;

  constructor(private order:OrderService,private router:Router, private route:ActivatedRoute){}

    ngOnInit(): void {
      this.allOrder_item()
     }

  allOrder_item(){
    this.order.getAllOrderItem().subscribe((data)=>{
        this.orderData = data.orderItemsData
      
    }, (error)=>{
      alert("some problem")
    })
  }
  
}
