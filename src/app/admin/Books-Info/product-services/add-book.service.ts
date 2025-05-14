import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { books } from '../book-update/book-update.component';


@Injectable({
  providedIn: 'root'
})
export class AddBookService {


  constructor(private http:HttpClient) { }

  
  private url = 'http://localhost:3000/add-books';
  private apiUrl = 'http://localhost:3000/books_Delete';

  submitbook(formData: FormData): Observable<any> {
    // console.log(formData.)
    return this.http.post(this.url, formData);
  }

  getallbooks(): Observable<any>{
    return this.http.get('http://localhost:3000/getallbookinadminpanel')
  }



  getbookbyid(id:number): Observable<any>{
    return this.http.get(`http://localhost:3000/getbooknyid/${id}`)
  }


  updateBook(bookId: string, bookData: FormData) :Observable<any>{
    console.log(bookId,bookData)
    return this.http.put(`http://localhost:3000/update_books/${bookId}`, bookData);
  }

  deleteBook(id:number):Observable<any>{
   return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCategory(): Observable<any>{
    return this.http.get(`http://localhost:3000/getcategory`);
  }

  GetAllproduct(): Observable<any>{
    return this.http.get('http://localhost:3000/getallproduct');
  }

  applyFilters(searchTitle:string, author:string, category_id:any, Limit:any): Observable<any>{
    console.log(searchTitle)
    return this.http.post('http://localhost:3000/filterbook',{title: searchTitle || null, author:author || null, category_id : category_id || null, Limit: Limit || null});
  }


  

  // deletebooks(id:number){
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }


  }



