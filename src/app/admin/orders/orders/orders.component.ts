import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../order-services/order.service';
import { ConfirmDialogComponent } from '../../../confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { BaseUnsubscribe } from '../../../baseclass/baseunsubscribe';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent extends BaseUnsubscribe implements OnInit {
  public orderData: any;
  public statuses: string[] = ['Pending', 'Shipping', 'Delivered', 'Canceled'];
  public disabledOrders: { [key: number]: boolean } = {};
  public orders: any;

  ngOnInit(): void {
    this.getAllOrder();
  }

  constructor(
    private order: OrderService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { super() }

  private getAllOrder() {
    this.order.getAllOrderShow()
     .pipe(takeUntil(this.destroy$))
    .subscribe({
     next:  (response) => {
        if (response) {
          this.orderData = response.orderData;
          console.log('orderdata');
        }
      },
     error: (error) => {
        alert('some problem');
      }
   });
  }

  public changeStatus(random_number: any, event: Event) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to change the status ?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Only proceed if the user confirms
        const newStatus = (event.target as HTMLSelectElement).value; // Get status after confirmation

        console.log(newStatus, random_number);

        this.order.updateOrderStatus(random_number, newStatus)
         .pipe(takeUntil(this.destroy$))
        .subscribe({
        next:  (response) => {
            console.log('Status updated successfully', response);
            this.getAllOrder();
          },
        error:  (error) => {
            alert('Error updating order status');
          }
        });
      } else {
        event.preventDefault();
      }
    });
  }

  colorCode(status: string) {
    return {
      'pending-status': status === 'Pending',
      'shipping-status': status === 'Shipping',
      'delivered-status': status === 'Delivered',
      'canceled-status': status === 'Canceled',
    };
  }
}

export interface order {
  order_id: number;
  user_id: number;
  book_id: number;
  quantity: number;
  price: number;
  total_price: number;
  order_date: null;
  total_amount: number;
}
