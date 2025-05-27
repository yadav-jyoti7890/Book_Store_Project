import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-baseClass',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './baseClass.component.html',
  styleUrl: './baseClass.component.css'
})
export class BaseClassComponent {
protected destroy$ = new Subject<void>();

   protected OnDestroy(): void {
  console.log("unSubscribe", this.destroy$)
  this.destroy$.next();
  this.destroy$.complete();
  }

 protected loading = signal(false); 
 private minShowTime = 200; 
 private showTimestamp = 0;
  

   show(){
    this.showTimestamp = Date.now()
    console.log(this.showTimestamp);
    this.loading.set(true)
  }

   hide() {
    const elapsed = Date.now() - this.showTimestamp;
    const remaining = this.minShowTime - elapsed;

    if (remaining > 0) {
    
      setTimeout(() => this.loading.set(false), remaining);
    } else {
      this.loading.set(false);
    }
}

  
  protected toggleLoading(value:boolean){
   this.loading.set(value)
  }

  protected isLoading(){
    return this.loading()
  }


}
