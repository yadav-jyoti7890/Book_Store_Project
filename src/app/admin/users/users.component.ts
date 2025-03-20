import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../admin-service/users.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
 usersData:any;
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

  // allOrder_item(){
  //   this.order.getAllOrderItem().subscribe((data)=>{
  //       this.orderData = data.orderItemsData
      
  //   }, (error)=>{
  //     alert("some problem")
  //   })
  // }

}
