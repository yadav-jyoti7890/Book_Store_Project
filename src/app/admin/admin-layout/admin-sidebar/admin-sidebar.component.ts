import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../admin-services/admin.service';



@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterOutlet,RouterLinkActive,MatIconModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent implements OnInit{
  public totalUsers! : number
  public totalProducts! : number
  public totalContact! : number
  public totalOrder! :number
  public totalCategory!:number;
  public totalOrderItems! :number
  public totalCompanyInfo! : number
  isActive = false;

  constructor(private adminServices:AdminService){ }

  ngOnInit():void {
    
    this.getalluser();
    this.getallbooks();
    this.getallconact();
    this.getAllOrderCount();
    this.getAllCompanyData();
    this.getAllCategory();
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

  getalluser(){
    this.adminServices.getAlluserinadmin().subscribe((response)=>{
     this.totalUsers = response.totalUsers;
    //  console.log(this.totalUsers);
    })   
  }

  getallbooks(){
    this.adminServices.getallbooksinadmin().subscribe((response)=>{
      this.totalProducts = response.totalBooks;
      // console.log(this.totalBooks)
    })
  }

  getallconact(){
    this.adminServices.getallcontactinadmin().subscribe((response)=>{
      if(response.status == 200){
        this.totalContact = response.totalContact
        // console.log(this.totalContact)
      }
    });
  }


  getAllOrderCount(){
    this.adminServices.countOrder().subscribe((response)=>{
        this.totalOrder = response.totalOrder
        // console.log(this.totalOrder)
      
    })
  }


 getAllCompanyData(){
   console.log("company")
  this.adminServices.countAllCompanyData().subscribe((response)=>{
    this.totalCompanyInfo = response.companyInfo;
    // console.log(this.companyInfo)
  },(error)=>{})
 }
 
   getAllCategory(){
    this.adminServices.getAllCategory().subscribe((response)=>{
    this.totalCategory = response.totalCategory
    
    },(error)=>{})



   }
}

