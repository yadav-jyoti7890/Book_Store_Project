import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AddBookService {


  constructor(private http:HttpClient) { }

  
  // private url = 'http://localhost:3000/add-books';
  // private apiUrl = 'http://localhost:3000/books_Delete';

  private apiUrl = environment.BaseUrl

  submitbook(formData: FormData): Observable<any> {
    console.log("add book")
    const url = this.apiUrl + 'add-books';
    return this.http.post(url,formData);
  }









  getCategory(): Observable<any>{
    return this.http.get(`${this.apiUrl}getcategory`);
  }

  GetAllproduct(): Observable<any>{
    return this.http.get(`${this.apiUrl}getallproduct`);
  }

  // applyFilters(searchTitle:string, author:string, category_id:any, Limit:any): Observable<any>{
  //   console.log(searchTitle)
  //   return this.http.post('http://localhost:3000/filterbook',{title: searchTitle || null, author:author || null, category_id : category_id || null, Limit: Limit || null});
  // }


  

  // deletebooks(id:number){
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }


  }



