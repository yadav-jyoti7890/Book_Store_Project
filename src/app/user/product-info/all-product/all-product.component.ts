import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { product } from '../product-interface/product-interface';
import { GetbooksService } from '../product-services/getbooks.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedServiceService } from '../product-services/shared-service.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { response } from 'express';
import { LoaderBase } from '../../../loader/loader';

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLink, FormsModule, RouterOutlet],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css',
})
export class AllProductComponent extends LoaderBase{
  public imageBaseUrl = environment.BaseUrl;
  public product: product[] = [];
  public searchText = '';
  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.getallbooks();
    this.getCategoryFromSharedService();
    this.searchSubject.pipe(debounceTime(300)).subscribe((search) => {
      this.fetchResults(search);
    });
  }

  constructor(
  
    private productService: GetbooksService,
    private sharedService: SharedServiceService
  ) {super()}

  getallbooks() {
    this.showLoader()
    this.productService.receivebooks().subscribe((response) => {
      this.hideLoader()
      this.product = response.data;
      // console.log(this.product)
    });
  }

  getCategoryFromSharedService() {
    this.showLoader()
    this.sharedService.filteredProducts$.subscribe((data) => {
      if (data && data.length > 0) {
        this.hideLoader()
        this.product = data;
        console.log(this.product, 'date receive');
      }
    });
  }

  applyFilter() {
    this.searchSubject.next(this.searchText);
  }

  fetchResults(search: string) {
    this.showLoader()
    this.productService.applySearchFilter(search).subscribe({
      next: (response) => {
        this.hideLoader()
        // console.log(response);
        this.product = response.searchData;
      },
    });
  }

  
}
