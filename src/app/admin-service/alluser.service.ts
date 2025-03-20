import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlluserService {

  private apiUrl = 'http://localhost:3000/getalluser';
  private apiUrl1 = 'http://localhost:3000/getallbook';
  private apiUrl3 = 'http://localhost:3000/countAllcontact';
  private apiUrl4 = 'http://localhost:3000/getallorders';
  private apiUrl5 = 'http://localhost:3000/CountAllOrder';
  private apiUrl6 = 'http://localhost:3000/CountAllOrderItems';
  // private apiUrl7 = 'http://localhost:3000/getcompanyInfo';


  constructor(private http:HttpClient) { }

  getAlluserinadmin(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getallbooksinadmin() : Observable<any>{
    return this.http.get(this.apiUrl1)
  }

  getallcontactinadmin() : Observable<any>{
    return this.http.get(this.apiUrl3)
  }

  // getallordersinadmin():Observable<any>{
  //   return this.http.get(this.apiUrl4)
  // }

  countOrder():Observable<any>{
    return this.http.get(this.apiUrl5)
  }

  countOrderItem():Observable<any>{
    return this.http.get(this.apiUrl6)
  }

  countAllCompanyData():Observable<any>{
    return this.http.get('http://localhost:3000/getcompanyInfo');
  }

  

 



}
