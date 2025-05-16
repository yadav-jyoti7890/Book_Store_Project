import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AddBookService } from '../product-services/add-book.service';
import { response } from 'express';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { FormValidation } from '../../validation/form-validation';
import { ProductService } from '../product-services/product.service';
import { product } from '../product-interface/product.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css',
})
export class BookUpdateComponent implements OnInit {
  book_id1: any;
  // books: books = new books()
  image: any;
  public imagePreview: string | null | any;
  public selectedFile: File | null = null;
  public updateForm!: FormGroup;
  public data: any;
  public product!: product;

  constructor(
    private activate: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getcategory();
    this.activate.paramMap.subscribe((paramp) => {
      const book_id = paramp.get('id');
      console.log(book_id, 'book_id');
      if (book_id) {
        this.book_id1 = parseInt(book_id);
        this.getbookforupdate();
      }
    });

    this.updateForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),

      author: new FormControl('', Validators.required),

      description: new FormControl('', Validators.required),

      price: new FormControl('', [Validators.required, Validators.max(2)]),

      discount_type: new FormControl('', [Validators.required]),

      discount_value: new FormControl('', [
        Validators.required,
        Validators.max(2),
      ]),

      offer_price: new FormControl(''),

      category_id: new FormControl('', Validators.required),

      stock: new FormControl('', [Validators.required, Validators.max(2)]),

      image: new FormControl('', [Validators.required]),

      date: new FormControl('', Validators.required),
    });
  }

  getcategory() {
    this.productService.getCategory().subscribe(
      (response: { categoryData: any }) => {
        this.data = response.categoryData;
        console.log(this.data);
      },
      () => {}
    );
  }

  getbookforupdate() {
    this.productService.getbookbyid(this.book_id1).subscribe(
      (response) => {
        if (response) {
          this.product = response.data;
          this.updateForm.patchValue({
            title: this.product.title,
            author: this.product.author,
            description: this.product.description,
            price: this.product.price,
            discount_type: this.product.discount_type,
            discount_value: this.product.discount_value,
            offer_price: this.product.offer_price,
            category_id: this.product.category_id,
            stock: this.product.stock,
            date: this.product.date,
          });
        }
      },
      () => {}
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result; // Preview the image
      };
      reader.readAsDataURL(file);
    }
  }

  updateProduct() {
    console.log('update book');
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      console.error('No file selected');
      return;
    }
    formData.append('title', this.updateForm.get('title')?.value);
    formData.append('author', this.updateForm.get('author')?.value);
    formData.append('description', this.updateForm.get('description')?.value);
    formData.append('price', this.updateForm.get('price')?.value);
    formData.append(
      'discount_type',
      this.updateForm.get('discount_type')?.value
    );
    formData.append(
      'discount_value',
      this.updateForm.get('discount_value')?.value
    );
    formData.append('offer_price', this.updateForm.get('offer_price')?.value);
    formData.append('category_id', this.updateForm.get('category_id')?.value);
    formData.append('stock', this.updateForm.get('stock')?.value);
    formData.append('date', this.updateForm.get('date')?.value);

    this.productService.insertBook(formData).subscribe(
      () => {
        this.updateForm.reset();
        alert('Book added successfully');
      },
      () => {
        alert('Error adding book');
      }
    );
  }

  getError(controlName: string) {
    debugger;
    console.log(controlName);
    const control = this.updateForm.get(controlName);
    return FormValidation.getErrorMessage(control!);
  }
}
