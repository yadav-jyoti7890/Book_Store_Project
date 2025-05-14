import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactUsService } from '../contact-services/contact-us.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit{

  contact:contact = new contact;
  address: any;

  ngOnInit(): void {
    this.getAllCompanyData();
  }

  constructor(private contactService:ContactUsService){}

  companyData = {
    email: '',
    email2: '',
    contact: '',
    contact2: '',
    address: ''
  };

  contact_us(){
    console.log(this.contact)
    debugger
    this.contactService.contactUs(this.contact).subscribe((response)=>{
      alert("contact add successfully")
    },(error)=>{
      alert("contact not add successfully")
    })
  }

  getAllCompanyData(){
    console.log("get com")
   this.contactService.getAllCompanyDataOnAdmin().subscribe((response)=>{
    this.address = response.companyData;
    console.log(this.address,"lllllllllll")

   },(error)=>{
     console.log("user contact null")
   })
  } 


  

}





export class contact{
  email:string = "";
  contact:string = "";
  message:string="";
 constructor(){
  this.email="";
  this.contact="";
  this.message="";
 }
}

