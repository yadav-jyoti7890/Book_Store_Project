import { Component, OnInit } from '@angular/core';
// import { CategoryService } from '../../admin-service/category.service';
import { Observable } from 'rxjs';
import { CategoryService } from '../categories-services/category.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule,RouterLink, FormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  category: any;
  selectedCategory:any;
  searchQuery:any;
constructor(private categoryService:CategoryService){}
  ngOnInit(): void {
    this.getAllcategory();
  }

  getAllcategory(){
   this.categoryService.GetAllCategory().subscribe((response)=>{
   this.category = response.category
   console.log("users",this.category)
   },(error)=>{
    console.log("users get all data problem accurse")
   })
  }


 applyFilter(){
  console.log()
 }

 deleteCategory(id:number){
  console.log("category_id select", id);
  this.categoryService.deleteCategoryById(id).subscribe((response)=>{
    if(response){
      alert("category is deleted")
    }
  },(error)=>{
     alert("category is not deleted")
  })
 }




}
