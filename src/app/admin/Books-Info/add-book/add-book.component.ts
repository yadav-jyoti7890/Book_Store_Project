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
import { ValidationComponent } from '../../../validation/validation/validation.component';
import { product, productForm } from '../product-interface/product.model';
import { takeUntil } from 'rxjs';
import { BaseUnsubscribe } from '../../../baseclass/baseunsubscribe';
import { CanDeactivateInterface } from '../../../candeactive-guards/candeactivate.model';
import { ConfirmDialogComponent } from '../../../confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { NotificationsService } from '../../notification-service/notifications.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { response } from 'express';



@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule,ValidationComponent, MatSnackBarModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent extends BaseUnsubscribe implements OnInit, OnDestroy, CanDeactivateInterface {
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
    private productService: ProductService,
    private notify: NotificationsService
) {super()}

 
private getCategory() {
     this.productService.getCategory()
     .pipe(takeUntil(this.destroy$))
     .subscribe({
      next: (response) => {
          this.data = response.categoryData;
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

// public calculateOfferPrice() {
//    let price = this.addProductForm.get('price') 
//    let discount_value = this.addProductForm.get('discount_value')
//    let discount_type = this.addProductForm.get('discount_type')

//     console.log(price, discount_type, discount_value);
//     let offer_price;

//     if (discount_type === 'amount') {
//       offer_price = price - discount_value;
//       this.addProductForm.get('offer_price')?.setValue(offer_price);
//     } else if (discount_type === 'percent') {
//       this.addProductForm
//         .get('offer_price')
//         ?.setValue(price - (price * discount_value) / 100);
//     } else {
//      this.addProductForm.get('offer_price')?.setValue('offer_value');
//     }
// }

public calculateOfferPrice() {
  const price = this.addProductForm.get('price')?.value;
  const discountValue = this.addProductForm.get('discount_value')?.value;
  const discountType = this.addProductForm.get('discount_type')?.value;

  console.log(price, discountType, discountValue);

  let offerPrice: number | null = null;

  if (price != null && discountValue != null && discountType) {
    if (discountType === 'amount') {
      offerPrice = price - discountValue;
    } else if (discountType === 'percent') {
      offerPrice = price - (price * discountValue) / 100;
    }
  }

  this.addProductForm.get('offer_price')?.setValue(offerPrice);
}


public submitProductForm() {
  console.log(this.addProductForm.value);
  if (this.addProductForm.valid) {
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      console.error('No file selected');
      return;
    }
    const productData:any = this.addProductForm.getRawValue();
    console.log(productData)

    for (const key in productData) {
    if (productData.hasOwnProperty(key) && productData[key] != null) {
      formData.append(key, productData[key]);
    }
  }

    this.productService.insertBook(formData).subscribe({
      next: (response) => {
         this.snackBar.open("product add successfully", 'close')
         this.addProductForm.reset()
      },
    });
  }
}


ngOnDestroy() {
    this.OnDestroy()
}

canDeactivate(): Promise<boolean> {
  if (this.addProductForm.dirty) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        message: 'You have unsaved changes. Do you really want to leave?',
      },
    });

    return dialogRef.afterClosed().toPromise().then((result) => {
      return result === true;
    });
  }

  return Promise.resolve(true); 
}


}
