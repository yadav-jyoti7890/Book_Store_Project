import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../user-services/users.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{

imageBaseUrl = environment.BaseUrl;
selectedRole: any = '';
searchQuery: any= '';


 usersData:any;
  filterValue: any;
  ngOnInit(): void {
    this.getAllUsersFromDataBase()
  }

  constructor(private users:UsersService){}

  getAllUsersFromDataBase(){
   this.users.GetAllUsers().subscribe((response)=>{
   this.usersData = response.users
   console.log("users",this.usersData)
   },(error)=>{
    console.log("users get all data problem accurse")
   })
  }

  user_delete(id:number){
    console.log(id)
    this.users.deleteUsers(id).subscribe((response)=>{
      alert("user delete successfully")
    },(error)=>{
      alert("user not delete successfully")
    })
  }

  applyFilters() {
    console.log("Role:", this.selectedRole, "Status:","Search:", this.searchQuery);
  
    this.users.applyFilter(this.selectedRole, this.searchQuery).subscribe(
      (response) => {
        this.usersData = response.filter
        console.log("Filtered Data:", response);
      },
      (error) => {
        console.error("Error fetching filtered users:", error);
      }
    );
  }

  resetAll(){
    this.selectedRole = null;
    this.searchQuery = null;
    this.getAllUsersFromDataBase();
  }




}
