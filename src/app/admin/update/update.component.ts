import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OrderService } from '../../admin-service/order.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  order_id1:number | null = null
  order_data:any;
  constructor(private router:Router, private route:ActivatedRoute,private order:OrderService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      const order_id = params.get('id');
      console.log(order_id, "order_id")
      if(order_id){
        this.order_id1 = parseInt(order_id);
        console.log(this.order_id1)
        this.getorder_id();
      }
    })
  }

  getorder_id(){
    this.order.getOrderById(this.order_id1).subscribe((response)=>{
      if(response){
       this.order_data = response.data;
      }
    },(error)=>{})
  }

  
  
}
