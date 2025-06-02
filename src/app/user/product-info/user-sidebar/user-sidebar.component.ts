import { Component, OnInit } from '@angular/core';
import { GetbooksService } from '../product-services/getbooks.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedServiceService } from '../product-services/shared-service.service';
import { LoaderBase } from '../../../loader/loader';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { switchMap, timer } from 'rxjs';
import { response } from 'express';
import { CacheService } from '../../../cache/cache.service';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NgxSliderModule],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css',
})
export class UserSidebarComponent extends LoaderBase implements OnInit {
  public category: any;
  public filterCategory: any;
  public searchByPrice: any;

  minValue: number = 0;
  maxValue: number = 0;
  defaultMin: number = 0;
  defaultMax: number = 0;

  public date = [
    { label: 'Latest', value: 'Latest' },
    { label: '30 Days', value: '30' },
    { label: '90 Days', value: '90' },
  ];

  options: Options = {
    floor: 0,
    ceil: 0,
    showSelectionBar: true,
    translate: (value: number): string => {
      return '₹' + value;
    },
  };

  constructor(
    private productService: GetbooksService,
    private sharedService: SharedServiceService,
    private cache : CacheService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllCategory()
    this.getPriceRange();
    // this.cache.logAll();
  }

  getAllCategory() {
    return this.productService.getAllCategory().subscribe({
      next: (response) => {
        if (response) {
          this.category = response.category;
        }
      },
    });
  }

  public categoryFilter(categoryId: number) {
    this.sharedService.triggerSearchReset();
    this.showLoader();

    this.productService.filterCategory(categoryId).subscribe({
      next: (response) => {
        this.hideLoader();
        this.filterCategory = response.filterCategoryResult;
        this.sharedService.sendFilterData(this.filterCategory);
      },
    });
  }

  private getPriceRange() {
    this.productService.getPriceRange().subscribe({
      next: (response) => {
        if (response?.getPrice) {
          const floor = Number(response.getPrice.min_price);
          const ceil = Number(response.getPrice.max_price);

          this.defaultMin = floor;
          this.defaultMax = ceil;

          this.minValue = floor;
          this.maxValue = ceil;

          this.options = {
            floor,
            ceil,
            showSelectionBar: true,
            translate: (value: number): string => {
              return '₹' + value;
            },
          };

          console.log('Slider values:', this.minValue, this.maxValue);
        }
      },
      error: (err) => {
        console.error('Error fetching price range:', err);
      },
    });
  }

  public onPriceClick(priceRange: string) {
    this.sharedService.triggerSearchReset();
    this.showLoader();

    const [minPrice, maxPrice] = priceRange
      .split('-')
      .map((val) => Number(val.trim()));

    this.productService
      .fetchProductsByPriceRange(minPrice, maxPrice)
      .subscribe({
        next: (response) => {
          this.hideLoader();
          this.searchByPrice = response.SearchByPrice;
          this.sharedService.sendFilterData(this.searchByPrice);
        },
      });
  }

  onDateFilterChange(selectedValue: string | number) {
    if (!selectedValue) return;

    this.productService
      .getProductsByDateFilter(selectedValue)
      .subscribe((response) => {
        this.filterCategory = response.date;
        this.sharedService.sendFilterData(this.filterCategory);
      });
  }

  applyPriceFilter() {
    console.log('Sending price range:', this.minValue, this.maxValue);

    this.productService
      .fetchProductsByPriceRange(this.minValue, this.maxValue)
      .subscribe({
        next: (response) => {
          this.hideLoader();
          this.searchByPrice = response.SearchByPrice;
          this.sharedService.sendFilterData(this.searchByPrice);
        },
        error: (err) => {
          console.error('Error fetching data', err);
        },
      });
  }

  resetPriceRange() {
    // Reset values to default min & max (from API)
    this.minValue = this.defaultMin;
    this.maxValue = this.defaultMax;
  }
}
