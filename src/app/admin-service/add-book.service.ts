import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { books } from '../admin/book-update/book-update.component';


@Injectable({
  providedIn: 'root'
})
export class AddBookService {


  constructor(private http:HttpClient) { }

  
  private url = 'http://localhost:3000/add-books';
  private apiUrl = 'http://localhost:3000/books_Delete';

  submitbook(formData: FormData): Observable<any> {
    return this.http.post(this.url, formData);
  }

  getallbooks(): Observable<any>{
    return this.http.get('http://localhost:3000/getallbookinadminpanel')
  }

  // deleteBookOnAdmin(id:number){
  //   return this.http.delete(`http://localhost:3000/deletebookinadminpanel/${id}`)
  // }

  getbookbyid(id:number): Observable<any>{
    return this.http.get(`http://localhost:3000/getbooknyid/${id}`)
  }

  // updateBook(id:number, data:any) :Observable<any>{
  //   console.log(id,data)
  //   return this.http.put(`http://localhost:3000/updatebook/${id}`,data)
  // }

  updateBook(bookId: string, bookData: FormData) :Observable<any>{
    console.log(bookId,bookData)
    return this.http.put(`http://localhost:3000/update_books/${bookId}`, bookData);
  }

  deleteBook(id:number):Observable<any>{
   return this.http.delete(`${this.apiUrl}/${id}`);
  }
  

  // deletebooks(id:number){
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }


  }



