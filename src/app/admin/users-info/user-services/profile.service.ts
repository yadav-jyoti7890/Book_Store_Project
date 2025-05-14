import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/upload-profile';

  constructor(private http:HttpClient) { }

  uploadProfile(userId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profileImage', file);
    formData.append('user_id', userId.toString());

    return this.http.post(this.apiUrl, formData);
  }
}
