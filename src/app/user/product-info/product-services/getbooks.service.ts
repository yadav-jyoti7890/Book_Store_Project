import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GetbooksService{
  private apiUrl = environment.BaseUrl;

  constructor(private http:HttpClient) { }
 

  receivebooks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}getbooks`);
  }

  getAllCategory(): Observable<any> {
    return this.http.get(`${this.apiUrl}getCategory1`);
  }

  filterCategory(categoryId: number): Observable<any>{
     return this.http.get(`${this.apiUrl}filterCategory/${categoryId}`);
  }

  applySearchFilter(search:string): Observable<any>{
    return this.http.get(`http://localhost:3000/searchApplyFilter?term=${search}`)
  }

fetchProductsByPriceRange(min:number, max:number): Observable<any>{
 return this.http.get(`http://localhost:3000/searchByPrice?minPrice=${min}&maxPrice=${max}`)
}

// fetchLatestProducts(): void {
//   this.http.get(`http://localhost:3000/searchByLatest`)
//   }

  // searchByLatest(): Observable<any>{
  //     this.http.get(`http://localhost:3000/searchByLatest`)
  // }

 

}



