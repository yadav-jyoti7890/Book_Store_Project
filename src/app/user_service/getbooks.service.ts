import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../user/book/book.component';

@Injectable({
  providedIn: 'root'
})
export class GetbooksService {
  private apiUrl = "http://localhost:3000/getbooks";

  constructor(private http:HttpClient) { }

  receivebooks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
 

}



