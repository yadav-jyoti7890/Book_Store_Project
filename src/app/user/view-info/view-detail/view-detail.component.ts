import { CommonModule } from '@angular/common';

import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { ViewDetailService } from '../view-services/view-detail.service';
import { response } from 'express';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-view-detail',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './view-detail.component.html',
  styleUrl: './view-detail.component.css'
})
export class ViewDetailComponent implements OnInit{
   private count = new BroadcastChannel('count')
   public imageBaseUrl = environment.BaseUrl
   
 id:number|undefined;
 view_book:any;
 quantity:number= 1;
 getuserid:any;
 increase:any;
//  addtocart:number=0;

 
  user_id: any;
  total_count: any;

  constructor(private route:ActivatedRoute, private router:Router, private view_detail:ViewDetailService, private ngzone:NgZone,private dialog: MatDialog,private snackBar:MatSnackBar){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
       const view_detail_Id = params.get('id'); 
       console.log(view_detail_Id)
      if(view_detail_Id){
       this.id = +view_detail_Id;
       this.viewdetail();
      }
  })
 
}

  viewdetail() {
     this.view_detail.getbookdetail(this.id).subscribe((response) => {
      this.view_book = response.data; 
      console.log(this.view_book ,"view")
    },
    (error) => {
      console.error("Error fetching books", error);
    }
  );
  }
 

  add(){
    console.log("add")
    if(this.quantity < 10){
      this.quantity+=1;
    }
  }

  substract(){
    console.log("minus")
    if(this.quantity > 1){
      this.quantity-=1;
  }

}


add_cart(data:any){
  console.log(data);
 
 let user_id = localStorage.getItem('user_id');
 const addtobook = {
  title : data.title,
  description : data.description,
  user_id : user_id,
  book_id : data.product_id,
  price : data.price,
  quantity1 : this.quantity,
  image:data.image
 }
 this.view_detail.addtocart(addtobook).subscribe((data)=>{
 this.add_cart_count()
 this.snackBar.open('add to cart successfully', 'close', {duration:2000,horizontalPosition:'center',verticalPosition:'top'})
  this.router.navigate(['./book']);

  console.log("add")
 },(error)=>{
  this.snackBar.open('not add inside the cart', 'close', {duration:2000,horizontalPosition:'center',verticalPosition:'top'})

 })
}

add_cart_count() {
  console.log('User logout up!');

  // Send a message to other components
  this.count.postMessage({ type: 'add_cart_count'});
}


}
