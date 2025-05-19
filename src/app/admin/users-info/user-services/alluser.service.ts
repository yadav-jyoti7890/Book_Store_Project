import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlluserService {

  private apiUrl = environment.BaseUrl;

  private apiUrl7 = 'http://localhost:5000/update-profile'; 


  constructor(private http:HttpClient) { }

 
   uploadProfilePicture(userId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("profilePic", file);

    console.log(userId,file)

    return this.http.post(`${this.apiUrl}update-profile`,formData)
  }

  getImages(user_id:number): Observable<any>{   
    return this.http.get(`${this.apiUrl}getimage/${user_id}`);
  }




  

 



}
