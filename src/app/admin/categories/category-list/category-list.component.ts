import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../categories-services/category.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment.prod';
import { category } from '../category-interface/category.model';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { BaseUnsubscribe } from '../../../baseclass/baseunsubscribe';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent
  extends BaseUnsubscribe
  implements OnInit, OnDestroy
{
  public category: any;
  public imageBaseUrl = environment.BaseUrl;
  public searchText: string = '';
  searchTextChanged: Subject<string> = new Subject<string>();

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.searchTextChanged.pipe(debounceTime(700)).subscribe((searchText) => {
      this.categoryService
        .filterCategoryByKeyword(searchText)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.category = response.category;
          },
          error: (error) => {
            console.log('Error while searching category');
          },
        });
    });
  }

  private getAllCategory() {
    this.categoryService
      .GetAllCategory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response);
          this.category = response.category;
        },
        error: (error) => {
          console.log('users get all data problem accurse');
        },
      });
  }

  public applyFilter() {
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

  ngOnDestroy(): void {
    this.OnDestroy();
  }
}
