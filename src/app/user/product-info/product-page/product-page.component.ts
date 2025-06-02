import { Component } from '@angular/core';
import { UserSidebarComponent } from '../user-sidebar/user-sidebar.component';
import { AllProductComponent } from '../all-product/all-product.component';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [UserSidebarComponent,RouterLink, AllProductComponent, RouterOutlet, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {

public isDetailView: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
     
      this.isDetailView = this.router.url.includes('/product-page/view-detail/');
    });
  }
}
