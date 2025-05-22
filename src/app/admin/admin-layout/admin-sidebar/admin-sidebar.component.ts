import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../admin-services/admin.service';
import { BaseUnsubscribe } from '../../../baseclass/baseunsubscribe';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterOutlet,
    RouterLinkActive,
    MatIconModule,
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent extends BaseUnsubscribe  implements OnInit, OnDestroy {
  public totalUsers!: number;
  public totalProducts!: number;
  public totalContact!: number;
  public totalOrder!: number;
  public totalCategory!: number;
  public totalOrderItems!: number;
  public totalCompanyInfo!: number;
  public isActive = false;
  public currentTime!: string;

  constructor(private adminServices: AdminService) {
    super()
   }


  ngOnInit(): void {
    this.getAllUsersCount();
    this.getAllProductsCount();
    this.getAllContactCount();
    this.getAllOrderCount();
    this.getAllCompanyDataCount();
    this.getAllCategoryCount();

    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    }, 1000);
  }

  public toggleActive() {
    this.isActive = !this.isActive;
  }

  // get getAllUsersCount count
  private getAllUsersCount() {
    this.adminServices.getAlluserinadmin()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
   
      next: (response) => {
           console.log("subscribe")
        this.totalUsers = response.totalUsers;
        //  console.log(this.totalUsers);
      },
      error: (error) => {

      }
    });
  }

  // get getAllProductsCount count
  private getAllProductsCount() {
    this.adminServices.getallbooksinadmin()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.totalProducts = response.totalBooks;
        // console.log(this.totalBooks)
      },
      error: (error) => {

      }
    });
  }

  // get getAllContactCount count
  private getAllContactCount() {
    this.adminServices.getallcontactinadmin()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:
        (response) => {
          if (response.status == 200) {
            this.totalContact = response.totalContact;
            // console.log(this.totalContact)
          }
        },
      error: (error) => {

      }
    });
  }

  // get getAllContactCount count
  private getAllOrderCount() {
    this.adminServices.countOrder()
    .pipe(takeUntil(this.destroy$))
    .subscribe({ next :(response) => {
      this.totalOrder = response.totalOrder;
      // console.log(this.totalOrder)
    },
    error: (error)=>{

    }
  });
  }

  // get getAllCompanyDataCount count
  private getAllCompanyDataCount() {
    console.log('company');
    this.adminServices.countAllCompanyData()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.totalCompanyInfo = response.companyInfo;
        // console.log(this.companyInfo)
      },
     error: (error) => { }
  });
    }
      

  // get getAllCategoryCount count
  private getAllCategoryCount() {
    this.adminServices.getAllCategory()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.totalCategory = response.totalCategory;
      },
     error: (error) => { }
    });
  }

    ngOnDestroy(){
     this.OnDestroy();
  }
}
