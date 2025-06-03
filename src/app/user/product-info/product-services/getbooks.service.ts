import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { CacheService } from '../../../cache/cache.service';


@Injectable({
  providedIn: 'root',
})
export class GetbooksService {
  private apiUrl = environment.BaseUrl;

  constructor(private http: HttpClient, private cache:CacheService) {}

  receivebooks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}getbooks`);
  }


    getAllCategory(): Observable<any> {
    const cachedData = this.cache.get('categories');

    if (cachedData) {
      return of(cachedData); 
    }

    return this.http.get(`${this.apiUrl}getCategory1`).pipe(
      tap(data => this.cache.set('categories', data))
    );
  }

  filterCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}filterCategory/${categoryId}`);
  }

  applySearchFilter(search: string): Observable<any> {
    return this.http.get(
      `http://localhost:3000/searchApplyFilter?term=${search}`
    );
  }

  fetchProductsByPriceRange(min: number, max: number): Observable<any> {
    return this.http.get(
      `http://localhost:3000/searchByPrice?minPrice=${min}&maxPrice=${max}`
    );
  }

  getProductsByDateFilter(filterValue: string | number): Observable<any> {
    return this.http.get(
      `http://localhost:3000/dateFilter?filter=${filterValue}`
    );
  }

  getPriceRange(): Observable<any> {
    // return this.http.get(`${this.apiUrl}price-range`);
     const cachedData = this.cache.get('price-Range');
     console.log("cachedata price 61", cachedData )

    if (cachedData) {
      return of(cachedData); 
    }

    return this.http.get(`${this.apiUrl}price-range`).pipe(
      tap(data => this.cache.set('price-Range', data))
    );
  }



removeWishList(userId: number, bookId: number){
  return this.http.post(`${this.apiUrl}api/remove-wishlist`, { userId, bookId })
}

addWishList(userId: number, bookId: number){
return this.http.post(`${this.apiUrl}api/add-wishlist`, { userId, bookId })

}


getWishlist(userId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}api/wishlist/${userId}`);
}

submitFeedback(feedback:any){
   return this.http.post(`${this.apiUrl}feedback`, feedback);
}

getAllOrders(userId:number): Observable<any>{
     return this.http.get(`${this.apiUrl}getOrdersById/${userId}`);
}



}
