import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../book/book.component';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GetbooksService {
  private apiUrl = environment.BaseUrl;

  constructor(private http:HttpClient) { }

  receivebooks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}getbooks`);
  }
 

}



