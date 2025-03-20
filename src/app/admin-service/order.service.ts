import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/AllOrder'
  private apiUrl2 = 'http://localhost:3000/AllOrderItem'
  private apiUrl1 = 'http://localhost:3000/orderdelete'
  private apiUrl3 = 'http://localhost:3000/items'
   private apiUrl5= 'http://localhost:3000'
 

  constructor(private http:HttpClient) { }

  getallordershow(): Observable<any>{
   return this.http.get<any>(this.apiUrl)
  }

  delete_Order1(id:number): Observable<any>{
    debugger;
    console.log(id)
   return this.http.delete(`http://localhost:3000/orderdelete/${id}`)
  }

  getOrderById(order_id1: number | null): Observable<any>{
    return this.http.get(`http://localhost:3000/orderget/${order_id1}`)
  }

  getAllOrderItem () :Observable<any>{
   return this.http.get('http://localhost:3000/AllOrderItem')
  }

  updateOrderStatus(random_number: number, newStatus: string): Observable<any> {
    const body = {
      newStatus: newStatus,
      
    };
    console.log(random_number, newStatus)
    return this.http.put(`${this.apiUrl5}/update-status/${random_number}`,body);
  }

  user_items(id:number): Observable<any>{
    debugger
    return this.http.get(`http://localhost:3000/items/${id}`);
  }

  
}
