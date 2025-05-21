import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Import } from 'lucide-angular';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
 
  private apiUrl = environment.BaseUrl;
  constructor(private http:HttpClient) { }

  insertCategory(formData: FormData){
      return this.http.post(`${this.apiUrl}category/`,formData)
    }

  GetAllCategory(): Observable<any>{
    return this.http.get(`${this.apiUrl}getAllCategory`);
  }

  getCategoryById(category_id:number): Observable<any>{
    return this.http.get(`${this.apiUrl}getCategoryById/${category_id}`);
  }

  deleteCategoryById(id:number):Observable<any>{
    // console.log(`${this.apiUrl}deleteCategory/${id}`)
    return this.http.delete(`${this.apiUrl}deleteCategory/${id}`);
  }

  updateCategory(formData : FormData){
      console.log(formData)
      const category_id = Number(formData.get('category_id'))
      return this.http.put(`${this.apiUrl}updateCategory/${category_id}`, formData);
  }

filterCategoryByKeyword(keyword:string): Observable<any> {
  return this.http.get(`${this.apiUrl}SearchCategory?keyword=${keyword}`);
}






}
