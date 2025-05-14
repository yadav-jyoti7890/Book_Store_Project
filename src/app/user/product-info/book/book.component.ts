import { Component, OnInit } from '@angular/core';
import { GetbooksService } from '../product-services/getbooks.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{
  books:Book[] = [];
  

  ngOnInit(): void {
    this.getallbooks();
  }

  constructor(private bookService:GetbooksService){}

  getallbooks(){
    this.bookService.receivebooks().subscribe(
      (response) => {
        this.books = response.data; 
        console.log(this.books) // Use the 'data' from the response
      },
      (error) => {
        console.error("Error fetching books", error);
      }
    );
  
}

sure(){
  console.log("sure")
}

}


export interface Book {
  product_id:number;
  title: string;
  author: string;
  image: string;  // Or whatever type the image URL is
  description: string;
  price: number;
}

