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
  private apiUrl7 = 'http://localhost:5000/update-profile'; 


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


  countOrder():Observable<any>{
    return this.http.get(this.apiUrl5)
  }

  countOrderItem():Observable<any>{
    return this.http.get(this.apiUrl6)
  }

  countAllCompanyData():Observable<any>{
    return this.http.get('http://localhost:3000/getcompanyInfo');
  }

   uploadProfilePicture(userId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("profilePic", file);

    console.log(userId,file)

    return this.http.post('http://localhost:3000/update-profile',formData)
  }

  getImages(user_id:number): Observable<any>{
    
    return this.http.get(`http://localhost:3000/getimage/${user_id}`);
  }




  

 



}
