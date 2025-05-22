import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../product-services/product.service';
// import { FormValidation } from '../../../validation/form-validation';
import { ValidationComponent } from '../../../validation/validation/validation.component';
import { product, productForm } from '../product-interface/product.model';
import { response } from 'express';
import { takeUntil } from 'rxjs';
import { BaseUnsubscribe } from '../../../baseclass/baseunsubscribe';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule,ValidationComponent],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent extends BaseUnsubscribe implements OnInit, OnDestroy {
  public data: any;
  public selectedFile!: File 
  public addProductForm!: FormGroup<productForm>;

   
ngOnInit() {
  this.getCategory();
  this.addProductForm = new FormGroup<productForm>({
    title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    author: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    price: new FormControl(null, [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]*$')]),
    discount_type: new FormControl(null, Validators.required),
    discount_value: new FormControl(null, [Validators.required, Validators.min(5)]),
    offer_price: new FormControl(null),
    category_id: new FormControl(null, Validators.required),
    stock: new FormControl(null, [Validators.required, Validators.min(5)]),
    image: new FormControl(null, Validators.required),
    date: new FormControl(null, Validators.required),
  });
}


constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private productService: ProductService
) {super()}
 
private getCategory() {
     this.productService.getCategory()
     .pipe(takeUntil(this.destroy$))
     .subscribe({
      next: (response) => {
          this.data = response.categoryData;
      },
      error: (error) => {
          console.error("Error while getting category:", error);
      },
     })
}

public onFileChange(event: any) {
    let file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
    console.log(this.selectedFile)
}

public calculateOfferPrice() {
   let price = this.addProductForm.get('price') 
   let discount_value = this.addProductForm.get('discount_value')
   let discount_type = this.addProductForm.get('discount_type')

    console.log(price, discount_type, discount_value);
    let offer_price;

    // if (discount_type === 'amount') {
    //   offer_price = price - discount_value;
    //   this.addProductForm.get('offer_price')?.setValue(offer_price);
    // } else if (discount_type === 'percent') {
    //   this.addProductForm
    //     .get('offer_price')
    //     ?.setValue(price - (price * discount_value) / 100);
    // } else {
    //   this.addProductForm.get('offer_price')?.setValue(price);
    // }
}

public submitProductForm() {
    console.log(this.addProductForm.value)
    // if (this.addProductForm.valid) {
    //   const formData = new FormData();
    //   if (this.selectedFile) {
    //     formData.append('image', this.selectedFile);
    //   } else {
    //     console.error('No file selected');
    //     return;
    //   }
    //   formData.append('title', this.addProductForm.get('title').value);
    //   formData.append('author', this.addProductForm.get('author')?.value);
    //   formData.append(
    //     'description',
    //     this.addProductForm.get('description')?.value
    //   );
    //   formData.append('price', this.addProductForm.get('price')?.value);
    //   formData.append(
    //     'discount_type',
    //     this.addProductForm.get('discount_type')?.value
    //   );
    //   formData.append(
    //     'discount_value',
    //     this.addProductForm.get('discount_value')?.value
    //   );
    //   formData.append(
    //     'offer_price',
    //     this.addProductForm.get('offer_price')?.value
    //   );
    //   formData.append(
    //     'category_id',
    //     this.addProductForm.get('category_id')?.value
    //   );
    //   formData.append('stock', this.addProductForm.get('stock')?.value);
    //   formData.append('date', this.addProductForm.get('date')?.value);

    //   this.productService.insertBook(formData).subscribe(
    //     (response) => {
    //       this.addProductForm.reset();
    //       alert('Book added successfully');
    //     },
    //     (error) => {
    //       alert('Error adding book');
    //     }
    //   );
    // } else {
    // }
}

 ngOnDestroy() {
    this.OnDestroy()
  }


}
