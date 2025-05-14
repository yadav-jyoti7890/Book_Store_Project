import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AddressService } from '../address-services/address.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../admin/confirmation-dialog/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-address',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  user_id: any;
  address: address = new address()

  constructor(private address_service: AddressService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  add_address() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to add new product the status ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result) {
        debugger
        console.log(result)
        console.log(this.address)
        this.user_id = localStorage.getItem('user_id')
        this.address_service.addAddress(this.user_id, this.address).subscribe(
          (data) => {
          this.snackBar.open('address add successfully ✅!', 'close', {duration:3000, horizontalPosition:'center',verticalPosition:'top'})
            this.router.navigate(['/add_cart']);
          }, (erroe) => {
            this.snackBar.open('address not add successfully ✅!', 'close', {duration:3000, horizontalPosition:'center',verticalPosition:'top'})

          })
      }
    });
  }



close() {
  this.router.navigate(['/add_cart']);  // Close overlay when clicking '✖'
}


}



export class address {
  fullname: string = "";
  contact: number | undefined
  pincode: number | undefined
  city: string = "";
  state: string = "";
  house_no: string = "";
  road_name: string = "";
  constructor() {
    this.fullname = "";
    this.contact
    this.pincode
    this.city
    this.state
    this.house_no
    this.road_name
  }
}
