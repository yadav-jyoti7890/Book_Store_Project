import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AddBookService } from '../../admin-service/add-book.service';
import { MatButtonModule } from '@angular/material/button'; // Remove
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Remove
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Remove
import { MatToolbarModule } from '@angular/material/toolbar'; // Remove
import { MatIconModule } from '@angular/material/icon'; // Remove
import { MatInputModule } from '@angular/material/input';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';  // ✅ Import MatSelectModule
import { MatOptionModule } from '@angular/material/core';   
// Import other Angular modules


import { HttpClient } from '@angular/common/http';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../admin-service/category.service';

@Component({
  selector: 'app-read-book',
  standalone: true,
  imports: [RouterLink,CommonModule,MatIconModule,MatToolbarModule,MatButtonModule,
    MatTableModule,MatPaginatorModule,MatInputModule,MatSelectModule,MatOptionModule,FormsModule],
  templateUrl: './read-book.component.html',
  styleUrl: './read-book.component.css'
})
export class ReadBookComponent implements OnInit, AfterViewInit{

  totalRecords = 0; // Initialize total records to 0 (this will be dynamic)
  pageSize = 10;    // Page size (number of records per page)
  currentPage = 1;  // Current page (1-based index)
  receive_books: any;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['SN', 'title', 'author', 'description','price','image', 'category_name','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  searchTitle : any = '';
  author:any;
  filterdata: any;
  category: any;
  filtercategory:any;
  category_id: any;
  Limit: any;
  page1:any


  constructor(private router:Router,private bookservice:AddBookService,private categoryService:CategoryService,
    private http:HttpClient,private dialog:MatDialog,private snackBar:MatSnackBar){}

  ngOnInit(): void {
    // this.get_All_Books()
    this.loadData()
    this.getAllcategory();
  }

  ngAfterViewInit(): void {
 
    if (this.paginator) {
      this.paginator.page.subscribe(() => {
        this.loadData();
      });
    }
  }


  // get_All_Books(){
  //   this.bookservice.getallbooks().subscribe((response)=>{
  //     if(response){
  //       this.receive_books = response.data
  //     }
  //   },(error)=>{})
  // }

  // delete_books(id:number){
  //   console.log(id,"read_books_id")
  //  this.bookservice.deleteBookOnAdmin(id).subscribe((response)=>{
  //   alert("data selete successfully")
  //   this.get_All_Books();
  //  },(error)=>{
  //   alert("data not deleted successfully")
  //  })
  // }

  loadData(): void {
    const url = 'http://localhost:3000/api/data';  // Backend API URL
    this.http.get<any>(url, {
      params: {
        page: this.currentPage.toString(),
        page_size: this.pageSize.toString()
      }
    }).subscribe(response => {
      // Set the data for the table
      this.dataSource.data = response.data;
      console.log(this.dataSource.data, "khjdskhdhkjh")
      
      
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

  changeCategory(categoryId:any){
   this.category_id = categoryId
  }

  changeLimit(Limit:any){
   this.Limit =  Limit 
  }

  applyFilter(){
    console.log(this.searchTitle, this.author,this.category_id, this.Limit, "applyfilter")
    this.bookservice.applyFilters(this.searchTitle, this.author,this.category_id,  this.Limit).subscribe((response)=>{
      if(response){
        this.dataSource.data = response.filter;
        console.log(this.dataSource.data) 
      }
    },(error)=>
    {})
  }

  getAllcategory(){
    
    this.categoryService.GetAllCategory().subscribe((response)=>{
    this.category = response.category
    console.log("users",this.category)
    },(error)=>{
     console.log("users get all data problem accurse")
    })
   }
}






