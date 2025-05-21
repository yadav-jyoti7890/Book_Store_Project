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


  updateBook(formdata: FormData) :Observable<any>{
    let bookId = Number(formdata.get('productId'))
    console.log("update book service")
    return this.http.put(`http://localhost:3000/update_books/${bookId}`, formdata);
    // return this.http.put(`${this.apiUrl}update_books/`,formdata)
  }

   getCategory(): Observable<any>{
    return this.http.get(`${this.apiUrl}getcategory`);
  }

    getProductById(id:number): Observable<any>{
    return this.http.get(`${this.apiUrl}getbookbyid/${id}`)
  }

    deleteBook(id:number):Observable<any>{
   return this.http.delete(`${this.apiUrl}deleteProducts/${id}`);

  }

    getAllproduct(): Observable<any>{
    const url = this.apiUrl + 'getallbookinadminpanel';
    return this.http.get(url);
  }

  
 filterProductByKeyword(keyword:string): Observable<any> {
  return this.http.get(`${this.apiUrl}SearchProduct?keyword=${keyword}`);
 }

  applyfilterByCategory(categoryId:number): Observable<any>{
    return this.http.get(`${this.apiUrl}applyCategory/${categoryId}`);
  }
}

