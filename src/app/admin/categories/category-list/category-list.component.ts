import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../categories-services/category.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment.prod';
import { category } from '../category-interface/category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule,RouterLink, FormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  public category : any;
  public imageBaseUrl = environment.BaseUrl;

  
constructor(private categoryService:CategoryService){}


ngOnInit(): void {
    this.getAllcategory();
}

getAllcategory(){
   this.categoryService.GetAllCategory().subscribe((response)=>{
    console.log(response)
   this.category = response.category
   },(error)=>{
    console.log("users get all data problem accurse")
   })
}

applyFilter(){
  console.log()
}

deleteCategory(id:number){
  this.categoryService.deleteCategoryById(id).subscribe((response)=>{
    if(response){
      alert("category is deleted")
      this.getAllcategory();

    }
  },(error)=>{
     alert("category is not deleted")
  })
}

}
