import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  
  private apiUrl = "http://localhost:3000/contact"
  private apiUrl2 = 'http://localhost:3000/getAllCompanyInfo'
  constructor(private http:HttpClient) { }

  contactUs(contactData:any){
    debugger
   return this.http.post(this.apiUrl,contactData);
  }

   getAllCompanyDataOnAdmin(): Observable<any>{
      return this.http.get(this.apiUrl2)
    }
}
