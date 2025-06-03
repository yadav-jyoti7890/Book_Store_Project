import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { address } from '../address/address.component';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = environment.BaseUrl
  
  constructor(private http:HttpClient) { }

  addAddress(id:number, data:address){
    console.log(data)
     return this.http.post(`${this.apiUrl}addAddress/${id}`,data)
  }
}
