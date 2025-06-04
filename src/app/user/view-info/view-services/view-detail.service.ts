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


  getBookDetail(id:number|undefined): Observable<any>{
    return this.http.get<any>(`http://localhost:3000/getbooksbyid/${id}`);
  }

  getAllFeedBack(product_id:number){
    return this.http.get<any>(`http://localhost:3000/getFeedBackById/${product_id}`);
  }

  order(data:any):Observable<any>{
    console.log(data)
    return this.http.post(this.apiUrl2,data);
  }
  
  addToCart(data:any){
    return this.http.post('http://localhost:3000/addtocart',data)
  }

  total_val(id:number): Observable<any> {
    return this.http.get(`http://localhost:3000/getproductbyid/${id}`);
  }

  
}
