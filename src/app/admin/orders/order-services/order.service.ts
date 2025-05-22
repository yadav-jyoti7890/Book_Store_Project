import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.BaseUrl;

  constructor(private http: HttpClient) {}

  getAllOrderShow(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}AllOrder`);
  }

  updateOrderStatus(random_number: number, newStatus: string): Observable<any> {
    const body = {
      newStatus: newStatus,
    };
    console.log(random_number, newStatus);
    return this.http.put(`${this.apiUrl}update-status/${random_number}`, body);
  }
}
