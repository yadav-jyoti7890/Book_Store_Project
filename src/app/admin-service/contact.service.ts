import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/getAllContact'
  private apiUrl2 = 'http://localhost:3000/deleteContact'
  constructor(private http:HttpClient) { }

  getAllContactDataOnAdmin(): Observable<any>{
    return this.http.get(this.apiUrl)
  }

  deleteContactById(id:number): Observable<any>{
     return this.http.delete(`${this.apiUrl2}/${id}`)
  }
}
