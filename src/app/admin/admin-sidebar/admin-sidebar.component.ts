import { Component, OnInit } from '@angular/core';
import { AlluserService } from '../../admin-service/alluser.service';
import { ProfileService } from '../../admin-service/profile.service';
import { Router } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterOutlet,RouterLinkActive],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit{
 totalUsers:number=0;
  totalBooks: any;
  totalContact: any;
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  user_id: any;
  totalOrder:number=0;
  userProfileImage: any;
  username = localStorage.getItem('userName');
  totalOrderItems:number=0;
  companyInfo: number=0;
  role: any;
  user: any;
  

  constructor(private admin:AlluserService){}

  


  ngOnInit():void {
    this.getalluser();
    this.getallbooks();
    this.getallconact();
    this.getAllOrderCount();
    this.getAllOrderCountItems();
    this.getAllCompanyData();
    // this.getUserProfile();
  }


  getalluser(){
    this.admin.getAlluserinadmin().subscribe((data)=>{
     this.totalUsers = data.totalUsers;
     console.log(this.totalUsers);
    })   
  }

  getallbooks(){
    this.admin.getallbooksinadmin().subscribe((data)=>{
      this.totalBooks = data.totalBooks;
      // console.log(this.totalBooks)
    })
  }

  getallconact(){
    this.admin.getallcontactinadmin().subscribe((data)=>{
      if(data.status == 200){
        this.totalContact = data.totalContact
        // console.log(this.totalContact)
      }
    });
  }


  getAllOrderCount(){
    this.admin.countOrder().subscribe((data)=>{
        this.totalOrder = data.totalOrder
        // console.log(this.totalOrder)
      
    })
  }

  getAllOrderCountItems(){
    this.admin.countOrderItem().subscribe((data)=>{
        this.totalOrderItems = data.totalOrderItems
        // console.log(this.totalOrderItems)
    })
  }

 getAllCompanyData(){
   console.log("company")
  this.admin.countAllCompanyData().subscribe((response)=>{
    this.companyInfo = response.companyInfo;
    console.log(this.companyInfo)
  },(error)=>{})
 }
 



}

// ngAfterViewInit(): void {
  //  gsap.from('.admin',{
  //   y:20,
  //   duration:1,
  //   opacity:0
  //  })
  // }
