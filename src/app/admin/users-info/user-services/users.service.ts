import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { __param } from 'tslib';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.BaseUrl
  // private apiUrl = 'http://localhost:3000/users';
  private apiUrl1 = 'http://localhost:3000/users_Delete'
  constructor(private http:HttpClient) { }

  GetAllUsers(categoryData : any): Observable<any>{
      const params = new HttpParams()
        .set('page', categoryData.page)
        .set('pageSize', categoryData.pageSize)
        .set('sortBy', categoryData.sortBy)
        .set('sortOrder', categoryData.sortOrder)
    return this.http.get(`${this.apiUrl}users`, {params})
  }

  deleteUsers(id: number) {
    return this.http.delete(`${this.apiUrl1}/${id}`);
  }

  applyFilter(selectedRole: string): Observable<any>{
    console.log(selectedRole, "ts file")
    return this.http.post('http://localhost:3000/filter',{ 
      role: selectedRole || null,
     })
  }
}  