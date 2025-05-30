import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private filteredProducts = new BehaviorSubject<any[]>([]);
  filteredProducts$ = this.filteredProducts.asObservable();
  private resetSearchSubject = new BehaviorSubject<boolean>(false);
  resetSearch$ = this.resetSearchSubject.asObservable();
  constructor() { }

  sendFilterData(data:any){
     this.filteredProducts.next(data);
  }

  triggerSearchReset() {
  this.resetSearchSubject.next(true);
  }


  


}
