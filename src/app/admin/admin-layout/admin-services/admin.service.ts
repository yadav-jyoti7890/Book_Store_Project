import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    public apiUrl = environment.BaseUrl

    private apiUrl4 = 'http://localhost:3000/getallorders';
    private apiUrl5 = 'http://localhost:3000/CountAllOrder';
    private apiUrl6 = 'http://localhost:3000/CountAllOrderItems';
    private apiUrl7 = 'http://localhost:5000/update-profile'; 
  
  
    constructor(private http:HttpClient) { }
  
    getAlluserinadmin(): Observable<any> {
      return this.http.get(`${this.apiUrl}getalluser`);
    }
  
    getallbooksinadmin() : Observable<any>{
       return this.http.get(`${this.apiUrl}getallbook`);
    }
  
    getallcontactinadmin() : Observable<any>{
      return this.http.get(`${this.apiUrl}countAllcontact`);
    }
  
    countOrder():Observable<any>{
      return this.http.get(`${this.apiUrl}CountAllOrder`);
    }
  
    getAllCategory():Observable<any>{
        return this.http.get(`${this.apiUrl}getCategoryCount`);
    }
  
    countAllCompanyData():Observable<any>{
      return this.http.get('http://localhost:3000/getcompanyInfo');
    }
}
