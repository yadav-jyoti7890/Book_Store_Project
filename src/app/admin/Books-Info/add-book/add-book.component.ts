import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AddBookService } from '../product-services/add-book.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../product-services/product.service';
import { FormValidation } from '../../validation/form-validation';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent implements OnInit {
  public data: any;
  public selectedFile!: File 
  public addProductForm!: FormGroup;

  ngOnInit(): void {
    this.getcategory();

    this.addProductForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),

      author: new FormControl('', Validators.required),

      description: new FormControl('', Validators.required),

      price: new FormControl('', [
        Validators.required,
        Validators.min(5)
      ]),

      discount_type: new FormControl('', [
        Validators.required,
      ]),

      discount_value: new FormControl('',[ Validators.required, Validators.min(5)]),

      offer_price: new FormControl(''),

      category_id: new FormControl('', Validators.required),

      stock: new FormControl('', [
        Validators.required,
        Validators.min(5)
      ]),

      image: new FormControl('', [Validators.required]),

      date: new FormControl('', Validators.required),
    });
  }

  constructor(
    private bookService: AddBookService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  getcategory() {
    console.log('category aa gai');
    this.productService.getCategory().subscribe(
      (response) => {
        this.data = response.categoryData;
        console.log(this.data);
      },
      (error) => {}
    );
  }

  onFileChange(event: any) {
    let file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
    console.log(this.selectedFile)
  }

  calculateOfferPrice() {
    let { price, discount_type, discount_value } = this.addProductForm.value;

    console.log(price, discount_type, discount_value);
    let offer_price;

    if (discount_type === 'amount') {
      offer_price = price - discount_value;
      this.addProductForm.get('offer_price')?.setValue(offer_price);
    } else if (discount_type === 'percent') {
      this.addProductForm
        .get('offer_price')
        ?.setValue(price - (price * discount_value) / 100);
    } else {
      this.addProductForm.get('offer_price')?.setValue(price);
    }
  }

  submitProductForm() {
    console.log(this.addProductForm.value)
    if (this.addProductForm.valid) {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      } else {
        console.error('No file selected');
        return;
      }
      formData.append('title', this.addProductForm.get('title')?.value);
      formData.append('author', this.addProductForm.get('author')?.value);
      formData.append(
        'description',
        this.addProductForm.get('description')?.value
      );
      formData.append('price', this.addProductForm.get('price')?.value);
      formData.append(
        'discount_type',
        this.addProductForm.get('discount_type')?.value
      );
      formData.append(
        'discount_value',
        this.addProductForm.get('discount_value')?.value
      );
      formData.append(
        'offer_price',
        this.addProductForm.get('offer_price')?.value
      );
      formData.append(
        'category_id',
        this.addProductForm.get('category_id')?.value
      );
      formData.append('stock', this.addProductForm.get('stock')?.value);
      formData.append('date', this.addProductForm.get('date')?.value);

      this.productService.insertBook(formData).subscribe(
        (response) => {
          this.addProductForm.reset();
          alert('Book added successfully');
        },
        (error) => {
          alert('Error adding book');
        }
      );
    } else {
    }
  }

  getError(controlName: string) {
    console.log(controlName);
    const control = this.addProductForm.get(controlName);
    return FormValidation.getErrorMessage(control!);
  }
}
