import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { product } from '../product-interface/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private http:HttpClient) { }

   private apiUrl = environment.BaseUrl
  
    insertBook(formData : FormData): Observable<any> {
      console.log("url", `${this.apiUrl}add_books`,formData);
      return this.http.post(`${this.apiUrl}add-books`,formData);
    }


    updateBook(bookId: string, bookData: FormData) :Observable<any>{
    // const url = `${this.apiUrl}update_books${bookId}`;
    // return this.http.put(url, bookData)
    console.log("update book service")
    return this.http.put(`http://localhost:3000/update_books/${bookId}`, bookData);
  }

   getCategory(): Observable<any>{
    return this.http.get(`${this.apiUrl}getcategory`);
  }

    getbookbyid(id:number): Observable<any>{
    return this.http.get(`${this.apiUrl}getbookbyid/${id}`)
  }
}

