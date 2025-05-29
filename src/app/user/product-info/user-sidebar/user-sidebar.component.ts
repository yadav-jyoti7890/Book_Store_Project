import { Component, OnInit } from '@angular/core';
import { GetbooksService } from '../product-services/getbooks.service';
import { category } from '../../home-page/home-interface/home-interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedServiceService } from '../product-services/shared-service.service';
import { LoaderBase } from '../../../loader/loader';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLink, RouterOutlet],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css',
})
export class UserSidebarComponent extends LoaderBase implements OnInit {
  public category: any;
  public filterCategory: any;
  public searchByPrice:any
  public priceRanges = [
    { label: '200 RS 300', value: '200-300' },
    { label: 'RS 400 - RS 500', value: '400-500' },
    { label: 'RS 500 - RS 600', value: '500-600' },
    { label: 'RS 700 - RS 800', value: '700-800' },
    { label: '700 RS 1000', value: '700-1000' },
  ];

   public date = [
    { label: 'Latest', value: 'Latest' },
    { label: '30 Days', value: '30' },
    { label: '90 Days', value: '90' },
 
  ];

  constructor(
    private productService: GetbooksService,
    private sharedService: SharedServiceService
  ) {super()}

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.productService.getAllCategory().subscribe({
      next: (response) => {
        if (response) {
          // console.log(response);
          this.category = response.category;
          console.log(this.category, 'category sidebar');
        }
      },
    });
  }

  public categoryFilter(categoryId: number) {
   this.showLoader()
    console.log(categoryId);
    this.productService.filterCategory(categoryId).subscribe({
      next: (response) => {
        this.hideLoader()
        this.filterCategory = response.filterCategoryResult;
        // console.log(this.filterCategory);
        this.sharedService.sendFilterData(this.filterCategory);
      },
    });
  }


  public onPriceClick(priceRange: string) {
    this.showLoader()
  const [minPrice, maxPrice] = priceRange.split('-').map(val => Number(val.trim()));
   console.log(minPrice, maxPrice)
   this.productService.fetchProductsByPriceRange(minPrice, maxPrice).subscribe({
    next: (response) => {
      this.hideLoader()
         this.searchByPrice = response.SearchByPrice;
        this.sharedService.sendFilterData(this.searchByPrice);
    },
    error: (error) => {
      console.error('Error:', error);
    }
  });
}

// onDateSelected(value: string) {
//   if (value === 'Latest') {
//     this.fetchLatestProducts();
//   } else {
//     const days = Number(value);
//     if (!isNaN(days)) {
//       this.fetchProductsByDateRange(days);
//     }
//   }
// }

// // Call this for Latest
// fetchLatestProducts() {
//   this.productService.searchByLatest().subscribe({
//     next: (response)=>{

//     }
//   })
// }

// // Call this for 30/90 days
// fetchProductsByDateRange(days: number): void {


// }
}
