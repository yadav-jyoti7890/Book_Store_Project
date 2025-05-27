import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../categories-services/category.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment.prod';
import { category } from '../category-interface/category.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirmation-dialog/confirm-dialog/confirm-dialog.component';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

import { BaseClassComponent } from '../../../baseclass/baseclass/baseclass.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatPaginatorModule,
    MatInputModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent
  extends BaseClassComponent
  implements OnInit, OnDestroy {
  public category: any;
  public imageBaseUrl = environment.BaseUrl;
  public searchText: string = '';
  public totalRecords!: number;
  public pageSize = 5;
  public currentPage = 1;
  sortBy! : string
  sortOrder! : string
  searchTextChanged: Subject<string> = new Subject<string>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
   
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllCategory();

    this.searchTextChanged.pipe(
      debounceTime(700), 
      switchMap((keyword: string) =>
         this.categoryService.filterCategoryByKeyword(keyword))
       
    ).subscribe(
      (result) => {
        this.hide()
        if(result){
        this.category = result.category;
        console.log(this.category); 
        }
     },
    );
  }

  getAllCategory() {
     this.show()
    const categoryData = {
      page: this.currentPage,
      pageSize: this.pageSize,
      sortBy : this.sortBy,
      sortOrder : this.sortOrder
    };
    console.log(categoryData)
    this.categoryService.GetAllCategory(categoryData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        
        next: (response) => {
          console.log(response, "category")
           this.hide()
          this.category = response.category;
          this.totalRecords = response.totalRecords;
          if (this.paginator) {
            this.paginator.length = this.totalRecords;
          }
        },

      });
  }

  public onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllCategory();
  }

  public applyFilter() {
    console.log("apply filter")
      this.show()
    this.searchTextChanged.next(this.searchText);
  }

  public deleteCategory(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        message:
          'Are you sure you want to delete this category and related product?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService
          .deleteCategoryById(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              if (response) {
                alert('Category is deleted');
                this.getAllCategory();
              }
            },
            error: (error) => {
              alert('Category is not deleted');
            },
          });
      } else {
        console.log('User cancelled deletion');
      }
    });
  }

  public ascending(name:string){

    this.sortBy = name;
    this.sortOrder = 'asc'
    this.getAllCategory();
  } 

    public descending(name:string){
    this.sortBy = name;
    this.sortOrder = 'desc'
    this.getAllCategory();
  } 

  ngOnDestroy(): void {
    this.OnDestroy();
  }
}
