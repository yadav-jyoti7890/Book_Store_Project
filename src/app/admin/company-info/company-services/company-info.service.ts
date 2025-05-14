import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {
  private apiUrl = 'http://localhost:3000/companyInfo'
  private apiUrl2 = 'http://localhost:3000/getAllCompanyInfo'
  private apiUrl3 = 'http://localhost:3000/deleteCompanyInfo'
  private apiUrl4 = 'http://localhost:3000/getCompanyInfoById'
  private apiUrl5 = 'http://localhost:3000';


  constructor(private http:HttpClient) { }
  companyInfosubmit(companyData:any){
    return this.http.post(this.apiUrl,companyData)
  }

  getAllCompanyDataOnAdmin(): Observable<any>{
    return this.http.get(this.apiUrl2)
  }

  deleteCompanyInfo(id:number){
    return this.http.delete(`${this.apiUrl3}/${id}`);
  }

  getCompanyInfoData(id:number): Observable<any>{
   return this.http.get(`${this.apiUrl4}/${id}`);
  }

  updateCompanyInfo(id: number, companyData: any){
    return this.http.put(`${this.apiUrl5}/updateComponyInfo/${id}`, companyData);
  }



  

}
