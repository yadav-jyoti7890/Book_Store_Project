import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// import { AddBookService } from '../../admin-service/add-book.service';
import { MatButtonModule } from '@angular/material/button'; // Remove
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Remove
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Remove
import { MatToolbarModule } from '@angular/material/toolbar'; // Remove
import { MatIconModule } from '@angular/material/icon'; // Remove
import { MatInputModule } from '@angular/material/input';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
// Import other Angular modules


import { HttpClient } from '@angular/common/http';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddBookService } from '../product-services/add-book.service';
import { ConfirmDialogComponent } from '../../confirmation-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink,CommonModule,MatIconModule,MatToolbarModule,MatButtonModule,MatTableModule,MatPaginatorModule,MatInputModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit, AfterViewInit{

  totalRecords = 0; // Initialize total records to 0 (this will be dynamic)
  pageSize = 10;    // Page size (number of records per page)
  currentPage = 1;  // Current page (1-based index)
  receive_books: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['SN', 'title', 'author', 'description','price','image','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router:Router,private bookservice:AddBookService,private http:HttpClient,private dialog:MatDialog,private snackBar:MatSnackBar){}

  ngOnInit(): void {
    // this.get_All_Books()
    this.loadData()
  }

  ngAfterViewInit(): void {
    // This is the safest place to interact with the paginator after view initialization
    if (this.paginator) {
      this.paginator.page.subscribe(() => {
        this.loadData(); // Refetch the data whenever the page changes
      });
    }
  }


  loadData(): void {
    const url = 'http://localhost:3000/api/data';  
    this.http.get<any>(url, {
      params: {
        page: this.currentPage.toString(),
        page_size: this.pageSize.toString()
      }
    }).subscribe(response => {
      // Set the data for the table
      this.dataSource.data = response.data;
      console.log(this.dataSource.data)
      
      // Dynamically set the totalRecords from the API response
      this.totalRecords = response.totalRecords;
      console.log(this.totalRecords)
      // Optionally, you can update the paginator here
      if (this.paginator) {
        this.paginator.length = this.totalRecords;
      }
    }, error => {
      console.error('Error fetching data:', error);  // Handle any errors
    });
  }

  // Method to handle page changes (when user clicks "Next", "Previous", etc.)
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;  // Angular paginator uses 0-based index
    this.pageSize = event.pageSize;         // Update the page size
    this.loadData();  // Fetch new data based on the updated page and page size
  }

  // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //   data: { message: `Are you sure you want to add new product the status ?` }
  // });

  delete_books(id:number){
    console.log(id)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Are you sure you want to delete product ?` }
    });
    dialogRef.afterClosed().subscribe(result => {
        debugger
        if (result) {
          debugger
          console.log(result)
          this.bookservice.deleteBook(id).subscribe((response)=>{
           this.snackBar.open('Product Delete Successfully ✅', 'close', {duration: 3000, horizontalPosition:'end', verticalPosition:'top'});
            this.loadData();
          },(error)=>{
            this.snackBar.open('Some Error to Delete Product ❌', 'close', {duration: 3000, horizontalPosition:'end', verticalPosition:'top'});

          })
        }
      });
  }

  updatebooks(id:number){
      console.log(id)
  }

}