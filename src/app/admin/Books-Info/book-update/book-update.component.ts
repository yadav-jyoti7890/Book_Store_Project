import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AddBookService } from '../product-services/add-book.service';
import { response } from 'express';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
// import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { FormValidation } from '../../validation/form-validation';

@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css'
})
export class BookUpdateComponent implements OnInit {
  book_id1: any
  // books: books = new books()
  image: any;
  public imagePreview: string | null | any;
  public selectedFile: File | null = null;
  public updateForm! : FormGroup 

  constructor(private router: Router, private activate: ActivatedRoute, private bookservice: AddBookService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activate.paramMap.subscribe((paramp) => {
      const book_id = paramp.get('id')
      console.log(book_id, "book_id");
      if (book_id) {
        this.book_id1 = parseInt(book_id);
        this.getbookforupdate();
      }
    })

     this.updateForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),

      author: new FormControl('', Validators.required),

      description: new FormControl('', Validators.required),

      price: new FormControl('', [
        Validators.required,
        Validators.max(2)
      ]),

      discount_type: new FormControl('', [
        Validators.required,
      ]),

      discount_value: new FormControl('',[ Validators.required, Validators.max(2)]),

      offer_price: new FormControl(''),

      category_id: new FormControl('', Validators.required),

      stock: new FormControl('', [
        Validators.required,
        Validators.max(2)
      ]),

      image: new FormControl('', [Validators.required]),

      date: new FormControl('', Validators.required),
    });


  }



  getbookforupdate() {
    this.bookservice.getbookbyid(this.book_id1).subscribe((response) => {
      if (response) {
        this.books = response.data;
        this.image = response.data.image;
        console.log(this.image)
        this.imagePreview = this.books.image ? 'http://localhost:3000/uploads/' + this.books.image : '';

      }
    }, (error) => { })
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;  // Preview the image
      };
      reader.readAsDataURL(file);
    }
  }

  
  update_book(event: Event) {
    event.preventDefault(); 

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to add new product the status ?` }
    });


    const formData = new FormData();
    formData.append('title', this.books.title || '');
    formData.append('author', this.books.author || '');
    formData.append('description', this.books.description || '');
    formData.append('price', this.books.price || '');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      formData.append('image', this.books.image || '');  
    }

    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result) {
        debugger
        console.log(result)

        this.bookservice.updateBook(this.book_id1, formData).subscribe(
          (response) => {
            this.snackBar.open('product update successfully', 'close', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' })
          },
          (error) => {
            this.snackBar.open('product not update successfully', 'close', { duration: 3000, horizontalPosition: 'center', verticalPosition: 'top' })

          }
        );
      }
    });


  }

  getError(controlName: string) {
    debugger;
    console.log(controlName);
    const control = this.updateForm.get(controlName);
    return FormValidation.getErrorMessage(control!);
  }

}



