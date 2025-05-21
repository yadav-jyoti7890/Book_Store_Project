import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../categories-services/category.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment.prod';
import { category } from '../category-interface/category.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// import { ConfirmDialogComponent } from '../../../confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirmation-dialog/confirm-dialog/confirm-dialog.component';


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
  public searchText: string = '';
  searchTextChanged: Subject<string> = new Subject<string>();
  
constructor(private categoryService:CategoryService, private dialog: MatDialog,){}


ngOnInit(): void {
    this.getAllcategory();
     this.searchTextChanged
    .pipe(debounceTime(700))  
    .subscribe((searchText) => {
      this.categoryService.filterCategoryByKeyword(searchText)
        .subscribe(
          (response) => {
            this.category = response.category;
          },
          (error) => {
            console.log("Error while searching category");
          }
        );
    });

}

getAllcategory(){
   this.categoryService.GetAllCategory().subscribe((response)=>{
    console.log(response)
   this.category = response.category
   },(error)=>{
    console.log("users get all data problem accurse")
   })
}


applyFilter() {
  this.searchTextChanged.next(this.searchText);  
}
  

deleteCategory(id: number) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: { message: 'Are you sure you want to delete this category and related product?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      
      this.categoryService.deleteCategoryById(id).subscribe(
        (response) => {
          if (response) {
            alert("Category is deleted");
            this.getAllcategory();
          }
        },
        (error) => {
          alert("Category is not deleted");
        }
      );
    } else {
     
      console.log("User cancelled deletion");
    }
  });

  }
}