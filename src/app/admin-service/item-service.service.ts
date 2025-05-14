import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http:HttpClient) { }

  user_items(id:number): Observable<any>{
    debugger
    return this.http.get(`http://localhost:3000/items/${id}`);
  }
}
