import { Component, OnInit } from '@angular/core';
// import { ContactService } from '../contact-info/contact-services/contact.service';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { ContactService } from '../contact-services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  public contacts: any;

  ngOnInit(): void {
    this.getAllContactData();
  }

  constructor(private contactService: ContactService) {}

  private getAllContactData() {
    this.contactService.getAllContactDataOnAdmin().subscribe(
      (response) => {
        this.contacts = response.ContactData;
      },
      (error) => {
        console.log('user contact null');
      }
    );
  }

  public deleteContact(id: number) {
    this.contactService.deleteContactById(id).subscribe(
      (response) => {
        alert('delete successfully');
        this.getAllContactData();
      },
      (error) => {
        alert('not deleted successfully');
      }
    );
  }
}
