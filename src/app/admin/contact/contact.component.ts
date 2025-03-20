import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../admin-service/contact.service';
import { CommonModule } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
  contacts:any;
  ngOnInit(): void {
    this.getAllConatctData()
  }

  constructor(private contactService:ContactService){}

  getAllConatctData(){
   this.contactService.getAllContactDataOnAdmin().subscribe((response)=>{
    this.contacts = response.ContactData;
   },(error)=>{
     console.log("user contact null")
   })
  } 

  deleteContact(id:number){
    this.contactService.deleteContactById(id).subscribe((response)=>{
      alert("delete successfully")
      this.getAllConatctData()
    },(error)=>{
      alert("not deleted successfully")
    })
  }



}
