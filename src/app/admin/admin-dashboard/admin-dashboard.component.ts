import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AlluserService } from '../../admin-service/alluser.service';
import { gsap } from 'gsap/gsap-core';
import { ProfileService } from '../../admin-service/profile.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterOutlet,RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  private channel = new BroadcastChannel('auth_channel');
  selectedFile: any;
  previewImage: any;
  user_id:any;
  user: any;
  profileImage: any;
  image:any;
  

  constructor(private admin:AlluserService, private router:Router, private snackBar:MatSnackBar){}

 

  ngOnInit():void {
    this.getImage();
  }





 logout() {
  
  console.log('User logout up!');

  
  this.channel.postMessage({ type: 'logout'});
}



onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  this.uploadProfilePicture();
}

// ✅ Upload Profile Picture
uploadProfilePicture() {
  if (!this.selectedFile) {
    alert("Please select a file!");
    return;
  }

  console.log(this.selectedFile)
  this.user_id = localStorage.getItem('user_id')
  this.admin.uploadProfilePicture(this.user_id, this.selectedFile)
    .subscribe(response => {
      alert(response.message);
      this.getImage();
    }, error => {
      alert("Error updating profile");
    });
}

getImage() {
  this.user_id = localStorage.getItem('user_id')
  this.admin.getImages(this.user_id).subscribe((response) => {
    if (response && response.userData.length > 0) {
      this.image = 'http://localhost:3000' + response.userData[0].profile_image;
    } else {
      this.image = null; // Default case
    }
    console.log(this.image, "image");
  }, (error) => {
    console.error("Error fetching image:", error);
    this.image = null;
  });
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
 
