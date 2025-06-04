import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { CategoryService } from '../../../admin/categories/categories-services/category.service';
import { response } from 'express';
import { ProductService } from '../../../admin/Books-Info/product-services/product.service';
import { category } from '../home-interface/home-interface';
import { product } from '../../product-common-interface/product-interface';
import { ViewDetailService } from '../../view-info/view-services/view-detail.service';
import { HomeService } from '../home-services/home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountingService } from '../../centralize-services/counting.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  public imageBaseUrl = environment.BaseUrl;
  public categoryData: category[] = [];
  public allItems: product[] = [];
  quantity: number = 0;
  @ViewChild('swiperContainer2', { static: false })
  swiperContainer2!: ElementRef;
  swiper2!: Swiper;

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProduct();
  }

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private viewService: ViewDetailService,
    private snackBar: MatSnackBar,
    private countingCartService: CountingService
  ) {}

  public add() {
    this.quantity += 1;
  }

  public minus() {
    this.quantity -= 1;
  }

  private getAllCategory() {
    this.categoryService.getAllCategory().subscribe(
      (response) => {
        this.categoryData = response.category;
        console.log(this.categoryData);
      },
      () => {}
    );
  }

  ngAfterViewInit(): void {
    const swiper = new Swiper('.category-swiper', {
      slidesPerView: 7,
      spaceBetween: 15,
      loop: true,
      autoplay: {
        delay: 1000,
      },
    });
  }

  private getAllProduct() {
    this.productService.getAllProduct().subscribe(
      (response) => {
        this.allItems = response.data;
        console.log(this.allItems, 'getAllProduct');
      },
      (error) => {}
    );
  }

  public add_cart(data: any) {
    console.log(data, 'home');
    let user_id = localStorage.getItem('user_id');
    const addtobook = {
      title: data.title,
      description: data.description,
      user_id: user_id,
      book_id: data.product_id,
      price: data.price,
      image: data.image,
    };
    this.viewService.addToCart(addtobook).subscribe((data) => {
      this.countingCartService.addToCart()
      this.snackBar.open('add to cart successfully', 'close', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
}
