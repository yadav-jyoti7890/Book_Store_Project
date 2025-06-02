import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = environment.BaseUrl
  constructor(private http:HttpClient) { }

  getWishlistBooks(userId:number): Observable<any>{
  return this.http.get(`${this.apiUrl}api/wishlist-books/${userId}`)
  }
}
