import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
// import { CompanyInfoService } from '../../admin-service/company-info.service';
import { ConfirmDialogComponent } from '../../confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CompanyInfoService } from '../company-services/company-info.service';

@Component({
  selector: 'app-addCompany-info',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './addCompany-info.component.html',
  styleUrl: './addCompany-info.component.css'
})
export class AddCompanyInfoComponent {
  company_info:company_info =  new company_info();

  constructor(private companyService:CompanyInfoService,private dialog: MatDialog,private snackBar:MatSnackBar){}

  companyInfo(){
    console.log(this.company_info)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to add new contact on the user panel side ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result) {
        debugger
        console.log(result)
        this.companyService.companyInfosubmit(this.company_info).subscribe((response)=>{
         this.snackBar.open('contact add successfully ✅', 'close', {duration:3000, horizontalPosition:'end', verticalPosition:'top'})
        },(error)=>{
          this.snackBar.open('Some Error to Add Contact ❌', 'close', {duration:3000, horizontalPosition:'end', verticalPosition:'top'})
        })
      }
    });

  
  }
}

export class company_info{
  email:string="";
  email2:string="";
  contact:string="";
  contact2:string="";
  address:string="";
  constructor(){
    this.email;
    this.email2;
    this.contact;
    this.contact2;
    this.address;
  }
}
