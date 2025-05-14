import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

// import Swiper from 'swiper';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { CategoryService } from '../../admin/categories/categories-services/category.service';
import { response } from 'express';
import { AddBookService } from '../../admin/Books-Info/product-services/add-book.service';
// import { Navigation } from 'lucide-angular';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements AfterViewInit, OnInit{
  imageBaseUrl = environment.BaseUrl;
  categoryData:any
  allItem: any;
 
  ngOnInit(): void {
    this.getallcategory()
    this.getallproduct()
  }

  constructor(private categoryservice: CategoryService, private bookservice:AddBookService){}

  @ViewChild('swiperContainer2', { static: false }) swiperContainer2!: ElementRef;
  swiper2!: Swiper;

  ngAfterViewInit() {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: true,
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
      },
      navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
      },
      breakpoints: {
          640: {
              slidesPerView: 2,
              spaceBetween: 10,
          },
          1024: {
              slidesPerView: 3,
              spaceBetween: 20,
          },
      }
  });


  


  }

  
  getallcategory(){
    this.categoryservice.GetAllCategory().subscribe((response)=>{
      this.categoryData = response.category;
      console.log(this.categoryData)
    },()=>{})
  }

  getallproduct(){
    this.bookservice.GetAllproduct().subscribe((response)=>{
      this.allItem = response.product; 
      console.log(this.allItem)
    },(error)=>{

    })
  }


}



