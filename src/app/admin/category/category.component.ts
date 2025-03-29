import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../admin-service/category.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import '@angular/compiler';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
   
  ngOnInit(): void {
  
  }

  constructor(private categoryService:CategoryService, private snackBar : MatSnackBar,private dialog: MatDialog){}

  add_category = {
    category_name: '',
    discription: '',
    image: null  // Will store the image file
  };

  selectedFile: File | null = null;  // To store the selected file

  onFileChange(event: any) {
    debugger;
    this.selectedFile = event.target.files[0];  // Get the first file
  }


//    category() {
//     debugger;
//     console.log("category")
//       if (this.selectedFile && this.add_category.category_name &&  this.add_category.discription) {
//         const formData = new FormData();
//         formData.append('image', this.selectedFile);  // Add the image file
//         formData.append('category_name', this.add_category.category_name);
//         formData.append('description', this.add_category.discription);
//         console.log(formData, "category")
  
//         const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//           data: { message: `Are you sure you want to add new product the status ?` }
//         });
  
//         dialogRef.afterClosed().subscribe(result => {
//           debugger
//           if (result) {
//             debugger
//             console.log(result)
//             this.categoryService.insertCategoryData(formData).subscribe(
//               (response: any) => {
//                 this.snackBar.open('product add successfully ✅ !', 'close' , {duration:3000, horizontalPosition: 'center', verticalPosition: 'top'})
//               },
//               (error) => {
//                 console.error('Error:', error);
//                 this.snackBar.open(' some error to add product ❌ !', 'close' , {duration:3000, horizontalPosition: 'center',  verticalPosition: 'top'})
//               }
//             );
//           }
//         });
//       }
  




// }
addCategory(){
  console.log("category")
  console.log(this.add_category.category_name ,  this.add_category.discription)
  if (this.selectedFile && this.add_category.category_name  &&  this.add_category.discription) {
            const formData = new FormData();
            formData.append('image', this.selectedFile);  // Add the image file
            formData.append('category_name', this.add_category.category_name);
            formData.append('discription', this.add_category.discription);
            console.log(formData, "category")
      
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              data: { message: `Are you sure you want to add new product the status ?` }
            });
      
            dialogRef.afterClosed().subscribe(result => {
              debugger
              if (result) {
                debugger
                console.log(result)
                this.categoryService.insertCategoryData(formData).subscribe(
                  (response) => {
                    this.snackBar.open('product add successfully ✅ !', 'close' , {duration:3000, horizontalPosition: 'center', verticalPosition: 'top'})
                  },
                  (error) => {
                    console.error('Error:', error);
                    this.snackBar.open(' some error to add product ❌ !', 'close' , {duration:3000, horizontalPosition: 'center',  verticalPosition: 'top'})
                  }
                );
              }
            });
}
}
}
