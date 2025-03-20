import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/users';
  private apiUrl1 = 'http://localhost:3000/users_Delete'
  constructor(private http:HttpClient) { }

  GetAllUsers(): Observable<any>{
    return this.http.get(this.apiUrl)
  }

  deleteUsers(id: number) {
    return this.http.delete(`${this.apiUrl1}/${id}`);
  }
}  