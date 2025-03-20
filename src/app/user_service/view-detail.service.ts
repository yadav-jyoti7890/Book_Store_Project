import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewDetailService {
 private apiUrl =  'http://localhost:3000/getbooks';
 private apiUrl2 = 'http://localhost:3000/order';
 private apiUrl3 = 'http://localhost:3000/addtocart';

  constructor(private http:HttpClient) { }


  getbookdetail(id:number|undefined): Observable<any>{
    return this.http.get<any>(`http://localhost:3000/getbooksbyid/${id}`);
  }

  order(data:any):Observable<any>{
    console.log(data)
    return this.http.post(this.apiUrl2,data);
  }
  
  addtocart(data:any){
    return this.http.post('http://localhost:3000/addtocart',data)
  }

  total_val(id:number): Observable<any> {
    return this.http.get(`http://localhost:3000/getproductbyid/${id}`);
  }
}
