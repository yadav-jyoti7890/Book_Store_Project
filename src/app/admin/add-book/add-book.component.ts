import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AddBookService } from '../../admin-service/add-book.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit{
  data:any;
  add_book = {
    title: '',
    author: '',
    description: '',
    price: null,
    image: null,  // Will store the image file
    category_name:''
  };

  selectedFile: File | null = null;  // To store the selected file
  selectedCategoryId: any;

  constructor(private bookService: AddBookService,private dialog: MatDialog,private snackBar:MatSnackBar) {}
  ngOnInit(): void {
    this.getcategory();
  }

  getcategory(){
    this.bookService.getCategory().subscribe((response)=>{
      this.data = response.categoryData;
      console.log(this.data)
    },(error)=>{})
  }
 

 

  
  // Handle file change event
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];  // Get the first file
  }

  // resetForm(form:any){
  //   form.reset();
  // }

  // Submit the form

  onCategoryChange(event: any) {
    this.selectedCategoryId = event.target.value;
    console.log("Selected Category ID:", this.selectedCategoryId);
  }

  
  addBook() {
    if (this.selectedFile && this.add_book.title && this.add_book.author && this.add_book.price && this.add_book.description) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);  // Add the image file
      formData.append('title', this.add_book.title);
      formData.append('author', this.add_book.author);
      formData.append('description', this.add_book.description);
      formData.append('price', this.add_book.price);  // Ensure price is a string
      formData.append('category_id', this.selectedCategoryId);
      console.log(formData)

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message: `Are you sure you want to add new product the status ?` }
      });

      dialogRef.afterClosed().subscribe(result => {
        debugger
        if (result) {
          debugger
          console.log(result)
          this.bookService.submitbook(formData).subscribe(
            (response: any) => {
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

      // Call the service to send the form data to the backend
   
    } 
  }

  
