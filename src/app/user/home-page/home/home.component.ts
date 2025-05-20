import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

// import Swiper from 'swiper';
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


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public imageBaseUrl = environment.BaseUrl;
  public categoryData: category[] = [];
  public allItems: product[] = [];

  ngOnInit(): void {
    this.getallcategory();
    this.getallproduct();
  }

  constructor(
    private categoryservice: CategoryService,
    private productService: ProductService
  ) {}

  @ViewChild('swiperContainer2', { static: false })
  swiperContainer2!: ElementRef;
  swiper2!: Swiper;

  getallcategory() {
    this.categoryservice.GetAllCategory().subscribe(
      (response) => {
        this.categoryData = response.category;
        console.log(this.categoryData);
      },
      () => {}
    );
  }

  getallproduct() {
    this.productService.getAllproduct().subscribe(
      (response) => {
        this.allItems = response.data;
        console.log(this.allItems, 'getAllProduct');
      },
      (error) => {}
    );
  }
}
