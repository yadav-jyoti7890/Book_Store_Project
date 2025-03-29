import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../admin-service/order.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterOutlet,FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
  orderData:any;
  statuses: string[] = ['Pending', 'Shipping', 'Delivered', 'Canceled'];
  disabledOrders: { [key: number]: boolean } = {};
  orders:any;
  
  ngOnInit(): void {
    this.getallorder();
    
  }

   constructor(private order:OrderService,private dialog: MatDialog, private cdr: ChangeDetectorRef){}

  getallorder(){
    this.order.getallordershow().subscribe((response)=>{
      if(response){
        this.orderData = response.orderData
      }
    }, (error)=>{
      alert("some problem")
    })
  }

  applyFilter(){
    
  }

  


// changeStatus(random_number: any, event: Event) {
//   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//     data: { message: `Are you sure you want to change the status to ?` } 
    
//   });
//   const newStatus = (event.target as HTMLSelectElement).value;
 

//   console.log(newStatus,random_number); 

//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       this.order.updateOrderStatus(random_number, newStatus).subscribe(
//         (response) => {
//           console.log('Status updated successfully', response);
         
//           this.getallorder();
//         },
//         (error) => {
//           alert("Error updating order status");
//         }
//       );
//     }
//   });
// }

changeStatus(random_number: any, event: Event) {
  
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: { message: `Are you sure you want to change the status ?` }
  });

  
  dialogRef.afterClosed().subscribe(result => {
    if (result) {  // Only proceed if the user confirms
      const newStatus = (event.target as HTMLSelectElement).value;  // Get status after confirmation

      console.log(newStatus, random_number);

      this.order.updateOrderStatus(random_number, newStatus).subscribe(
        (response) => {
          console.log('Status updated successfully', response);
          this.getallorder();
        },
        (error) => {
          alert("Error updating order status");
        }
      );
    } else {
      // If canceled, reset the dropdown to its previous value
      event.preventDefault(); 
    }
  });
}


colorCode(status:string){
  return {
    'pending-status': status === 'Pending',
    'shipping-status': status === 'Shipping',
    'delivered-status': status === 'Delivered',
    'canceled-status': status === 'Canceled'
  };
}






}







export interface order{
  order_id:number;
  user_id:number;
  book_id:number;
  quantity:number;
  price:number;
  total_price:number;
  order_date:null;
  total_amount:number;
}
