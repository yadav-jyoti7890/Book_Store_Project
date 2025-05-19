import { Component, OnInit } from '@angular/core';
import { GetbooksService } from '../product-services/getbooks.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { product } from '../product-interface/product-interface';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{

  public imageBaseUrl = environment.BaseUrl
  public product: product[] = [];

  
  

  ngOnInit(): void {
    this.getallbooks();
  }

  constructor(private bookService:GetbooksService){}

  getallbooks(){
    this.bookService.receivebooks().subscribe(
      (response) => {
        this.product = response.data; 
        console.log(this.product) 
      },
      (error) => {
        console.error("Error fetching books", error);
      }
    );
  
}


}



