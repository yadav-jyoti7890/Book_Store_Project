import { Component, OnInit } from '@angular/core';
// import { UsersService } from '../../admin-service/users.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../admin-service/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
 
  
  selectedRole: any = '';
// selectedStatus: string = '';
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
