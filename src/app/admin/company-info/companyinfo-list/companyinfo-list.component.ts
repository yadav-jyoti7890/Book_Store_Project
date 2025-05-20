import { Component, OnInit } from '@angular/core';
// import { CompanyInfoService } from '../../admin-service/company-info.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { RouterLink } from '@angular/router';
import { ConfirmDialogComponent } from '../../../confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'moment';
import { CompanyInfoService } from '../company-services/company-info.service';

@Component({
  selector: 'app-companyInfo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './companyInfo-list.component.html',
  styleUrl: './companyInfo-list.component.css',
})
export class CompanyInfoListComponent implements OnInit {
  address: any;
  ngOnInit(): void {
    this.getAllCompanyData()
  }

  constructor(private company: CompanyInfoService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  getAllCompanyData() {
    console.log("get com")
    this.company.getAllCompanyDataOnAdmin().subscribe((response) => {
      this.address = response.companyData;
      console.log(this.address)
    }, (error) => {
      console.log("user contact null")
    })
  }

  deleteCom_info(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to delete contact from user panel ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result) {
        debugger
        console.log(result)
        this.company.deleteCompanyInfo(id).subscribe((response) => {
          this.snackBar.open('Contact Delete Successfully ✅ !', 'close', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' })
          this.getAllCompanyData();
        }, (error) => {
          this.snackBar.open('Some error to delete contact ❌ !', 'close', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' })
        })
      }
    });



  }










}
