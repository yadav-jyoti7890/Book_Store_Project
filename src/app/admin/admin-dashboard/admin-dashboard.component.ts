import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AlluserService } from '../../admin-service/alluser.service';
import { gsap } from 'gsap/gsap-core';
import { ProfileService } from '../../admin-service/profile.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterOutlet,RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  private channel = new BroadcastChannel('auth_channel');
  

  constructor(private admin:AlluserService,private profile_service:ProfileService, private router:Router, private snackBar:MatSnackBar){}

 

  ngOnInit():void {
   
  }



 logout() {
  
  console.log('User logout up!');

  
  this.channel.postMessage({ type: 'logout'});
}


}

//   getalluser(){
//     this.admin.getAlluserinadmin().subscribe((data)=>{
//      this.totalUsers = data.totalUsers;
//      console.log(this.totalUsers);
//     })   
//   }

//   getallbooks(){
//     this.admin.getallbooksinadmin().subscribe((data)=>{
//       this.totalBooks = data.totalBooks;
//       // console.log(this.totalBooks)
//     })
//   }

//   getallconact(){
//     this.admin.getallcontactinadmin().subscribe((data)=>{
//       if(data.status == 200){
//         this.totalContact = data.totalContact
//         // console.log(this.totalContact)
//       }
//     });
//   }


//   getAllOrderCount(){
//     this.admin.countOrder().subscribe((data)=>{
//         this.totalOrder = data.totalOrder
//         // console.log(this.totalOrder)
      
//     })
//   }

//   getAllOrderCountItems(){
//     this.admin.countOrderItem().subscribe((data)=>{
//         this.totalOrderItems = data.totalOrderItems
//         // console.log(this.totalOrderItems)
//     })
//   }

//  getAllCompanyData(){
//    console.log("company")
//   this.admin.countAllCompanyData().subscribe((response)=>{
//     this.companyInfo = response.companyInfo;
//     console.log(this.companyInfo)
//   },(error)=>{})
//  }
 
