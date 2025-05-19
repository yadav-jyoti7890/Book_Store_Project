import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { ConfirmDialogComponent } from '../../confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { ProductService } from '../product-services/product.service';

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
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit, AfterViewInit {
  public imageBaseUrl = environment.BaseUrl;
  public category: string = '';
  public totalRecords!: number;
  public pageSize = 10;
  public currentPage = 1;
  public receive_books: any;
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] = [
    'SN',
    'title',
    'author',
    'description',
    'price',
    'discount-type',
    'discount-value',
    'offer-price',
    'stock',
    'sold',
    'publication_date',
    'image',
    'category',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private router: Router,
    private productService: ProductService,
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.getCategory();
    // this.getAllProduct();
    console.log(this.imageBaseUrl, 'imagebaseurl');
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.subscribe(() => {
        this.loadData();
      });
    }
  }

  loadData(): void {
    const url = 'http://localhost:3000/api/data';
    this.http
      .get<any>(url, {
        params: {
          page: this.currentPage.toString(),
          page_size: this.pageSize.toString(),
        },
      })
      .subscribe(
        (response) => {
          console.log(response, `${this.imageBaseUrl}${response.data[5].image}`)
          this.dataSource.data = response.data;

          this.totalRecords = response.totalRecords;

          if (this.paginator) {
            this.paginator.length = this.totalRecords;
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1; // Angular paginator uses 0-based index
    this.pageSize = event.pageSize; // Update the page size
    this.loadData(); // Fetch new data based on the updated page and page size
  }

  delete_books(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to delete product ?` },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.productService.deleteBook(id).subscribe(
          (response) => {
            this.snackBar.open('Product Delete Successfully ✅', 'close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
            this.loadData();
          },
          (error) => {
            this.snackBar.open('Some Error to Delete Product ❌', 'close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          }
        );
      }
    });
  }

  updateBooks(id: number) {
    console.log(id);
  }

  getCategory() {
    this.productService.getCategory().subscribe(
      (response) => {
        this.category = response;
        console.log(this.category, 'category');
      },
      (error) => {}
    );
  }
}
