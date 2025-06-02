import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist-service/wishlist.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
  private userId = Number(localStorage.getItem('user_id'))
  public imageBaseUrl = environment.BaseUrl
  wishlistBooks:any;

  ngOnInit(): void {
    this.loadWishlistBooks()
  }

  constructor(private wishlistService: WishlistService){}

  loadWishlistBooks() {
  this.wishlistService.getWishlistBooks(this.userId).subscribe((books: any[]) => {
    this.wishlistBooks = books;
  });
}

}
