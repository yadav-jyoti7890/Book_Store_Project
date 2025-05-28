import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reuseable',
  standalone: true,
  imports: [],
  templateUrl: './reuseable.component.html',
  styleUrl: './reuseable.component.css'
})
export class ReuseableComponent {
  
 @Input() visible = false;
}
