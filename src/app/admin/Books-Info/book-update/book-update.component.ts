import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../product-services/product.service';
import { product } from '../product-interface/product.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css',
})
export class BookUpdateComponent implements OnInit {
  public productId!: number;
  public imagePreview: string | null | any;
  public selectedFile: File | null = null;
  public updateForm!: FormGroup;
  public data: any;
  public product!: product;
  public imageBaseUrl = environment.BaseUrl;

  constructor(
    private activate: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategory();

    this.activate.paramMap.subscribe((paramp) => {
      this.productId = Number(paramp.get('id'));
      this.getProductById();
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

      image: new FormControl(''),

      date: new FormControl('', Validators.required),
    });
  }

  private getCategory() {
    this.productService.getCategory().subscribe(
      (response) => {
        this.data = response.categoryData;
        console.log(this.data);
      },
      (error) => { }
    );
  }

  private getProductById() {
    // console.log('click edit button', this.productId);
    this.productService.getProductById(this.productId).subscribe(
      (response) => {
        if (response) {
          this.product = response.data;
          console.log(this.product);
          this.updateForm.patchValue({
            title: this.product.title,
            author: this.product.author,
            description: this.product.description,
            price: this.product.price,
            discount_type: this.product.discount_type,
            discount_value: this.product.discount_value,
            offer_price: this.product.offer_price,
            category_id: this.product.category_id,
            stock: this.product.stock_quantity,
            image: this.product.image,
            date: this.product.publication_date.toString().split('T')[0],
            // image:this.product.image,
          });
        }
      },
      (error) => { }
    );
  }

  private getAllProduct() {
    this.productService.getAllproduct().subscribe(
      (response) => {
        // alert('fatch all data');
      },
      (error) => { }
    );
  }

  public onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  public updateProduct() {
    const formData = new FormData();
    console.log(this.updateForm.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
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
    formData.append('productId', String(this.productId));

    this.productService.updateBook(formData).subscribe(
      (response) => {
        this.getAllProduct();
        this.router.navigate(['./book-list']);
        alert('product update successfully');
      },
      (error) => {
        alert('Error update product');
      }
    );
  }

  public calculateOfferPrice() {
    let { price, discount_type, discount_value } = this.updateForm.value;

    console.log(price, discount_type, discount_value);
    let offer_price;

    if (discount_type === 'amount') {
      offer_price = price - discount_value;
      this.updateForm.get('offer_price')?.setValue(offer_price);
    } else if (discount_type === 'percent') {
      this.updateForm
        .get('offer_price')
        ?.setValue(price - (price * discount_value) / 100);
    } else {
      this.updateForm.get('offer_price')?.setValue(price);
    }
  }


}
