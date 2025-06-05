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
import { GetstorageitemService } from '../../../storage/getstorageitem.service';
import { GetbooksService } from '../../product-info/product-services/getbooks.service';
import { StarRatingPipe } from '../../pipes/star-rating.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, StarRatingPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  public imageBaseUrl = environment.BaseUrl;
  public categoryData: category[] = [];
  public allItems: product[] = [];
  private userId ! : number;
  quantity: number = 0;
  @ViewChild('swiperContainer2', { static: false })
  swiperContainer2!: ElementRef;
  swiper2!: Swiper;

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProduct();
    this.userId = Number(this.storageService.getUserId());
  }

  constructor(
    private categoryService: CategoryService,
    private productService: GetbooksService,
    private viewService: ViewDetailService,
    private snackBar: MatSnackBar,
    private countingCartService: CountingService, 
    private storageService: GetstorageitemService,
     
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
      },
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
    this.productService.receivebooks().subscribe(
      (response) => {
        this.allItems = response.data; 
      },
    );
  }
  

  public add_cart(data: any) {
    const addtobook = {
      title: data.title,
      description: data.description,
      user_id: this.userId,
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
