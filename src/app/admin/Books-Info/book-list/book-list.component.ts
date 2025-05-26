import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { ProductService } from '../product-services/product.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../../../confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { category } from '../../categories/category-interface/category.model';
import { BaseUnsubscribe } from '../../../baseclass/baseunsubscribe';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent extends BaseUnsubscribe implements OnInit, OnDestroy {
  public imageBaseUrl = environment.BaseUrl;
  public category: any;
  public totalRecords!: number;
  public pageSize = 5;
  public currentPage = 1;
  public receive_books: any;
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] = [
    'SN',
    'category',
    'image',
    'title',
    'author',
    'price',
    'discount-type',
    'discount-value',
    'offer-price',
    'action',
  ];
  public product: any;
  public searchText: string = '';
  public searchTextChanged: Subject<string> = new Subject<string>();
  public categoryControl = new FormControl('');
  public data:any

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private router: Router,
    private productService: ProductService,
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { super() }
  

  ngOnInit(): void {
    this.getCategory();
    this.loadData();

      this.categoryControl.valueChanges.subscribe((selectedId) => {
      this.applyCategoryFilter(Number(selectedId));
    });
  }

  loadData(): void {
    const url = 'http://localhost:3000/api/data';
    this.http.get<any>(url, { params: { page: this.currentPage.toString(),page_size: this.pageSize.toString(), }, })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.data = response.data;
          // console.log(response, this.dataSource);
          this.totalRecords = response.totalRecords;
             console.log("total records",this.totalRecords,)
          if (this.paginator) {
            this.paginator.length = this.totalRecords;
          }
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
   }
      

  public onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    console.log(this.currentPage);
    this.pageSize = event.pageSize;
    console.log(this.pageSize) 
    this.loadData(); 
  }

  public deleteBooks(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to delete product ?` }, // custom message
    });

    dialogRef.afterClosed()
     .pipe(takeUntil(this.destroy$))
    .subscribe((result) => {
      if (result) {
        console.log(result);

        this.productService.deleteBook(id).subscribe({
          next: (response) => {
            this.snackBar.open('Product Delete Successfully ✅', 'close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
            this.loadData();
          },
          error:  (error) => {
            this.snackBar.open('Some Error to Delete Product ❌', 'close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          }
        });
         
      } else {
        this.snackBar.open('Product not deleted ❌', 'close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    });
  }

  public updateBooks(id: number) {
    console.log(id);
  }

  private applyCategoryFilter(categoryId: number) {
    if (!categoryId) {
      this.loadData();
    } else {
      this.productService.applyfilterByCategory(categoryId)
       .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.filterCategory;
        },
      });
    }
  }

  private getCategory() {
    this.productService.getCategory().subscribe({
      next: (response) => {
        this.category = response.categoryData;
        console.log(this.category, 'category');
      },
    });
  }

  public ascending(name:string){
    console.log(name)
    this.productService.ascending(name).subscribe({
      next : (response) => {
      //  this.data = response.sortData
      }
    })
  }

  ngOnDestroy(){
    this.OnDestroy();
  }
}
