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
    return this.http.get(`${this.apiUrl}getallcategory`);
  }

  deleteCategoryById(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }



}
