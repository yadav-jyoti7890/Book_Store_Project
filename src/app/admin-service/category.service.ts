import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // apiUrl = 'http://localhost:3000/category'
  
  apiUrl1 = 'http://localhost:3000/getallcategory'
  constructor(private http:HttpClient) { }

  // insertCategoryData(data:any){
  //   return this.http.post(`http://localhost:3000/category/`,data)
  // }


  insertCategoryData(formData: FormData){
    // debugger;
    console.log(formData)
      return this.http.post(`http://localhost:3000/category/`,formData);
    }

    GetAllCategory(): Observable<any>{
    return this.http.get(this.apiUrl1)
  }

  deleteCategoryById(id:number):Observable<any>{
    return this.http.delete(`http://localhost:3000/deletecategory/${id}`);
  }

 

  //   getAllCategory(){
  //   return this.http.get(this.apiUrl1)
  // }





}
