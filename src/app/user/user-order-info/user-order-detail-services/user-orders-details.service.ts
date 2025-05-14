import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserOrdersDetailsService {
  private apiUrl = environment.BaseUrl;
  constructor(private http:HttpClient) { }

    getUserItems(id:number): Observable<any>{
    return this.http.get(`${this.apiUrl}getUserItems/${id}`)
  }

  orderDetailFetch(order_id:number): Observable<any>{
    return this.http.get(`${this.apiUrl}getOderDetail/${order_id}`)
  }
}
