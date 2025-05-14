import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  private apiUrl = environment.BaseUrl
  constructor(private http:HttpClient) { }

  user_items(id:number): Observable<any>{
    debugger
    return this.http.get(`${this.apiUrl}items/${id}`);
  }
}
