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
}

