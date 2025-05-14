import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AddBookService } from '../product-services/add-book.service';
import { MatDialog } from '@angular/material/dialog';
// import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ConfirmDialogComponent } from '../../confirmation-dialog/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit{
  data:any;

  add_book = {
    title: '',
    author: '',
    description: '',
    image: null,  
    category_name:'',
    price: null,
    offer_price:0,
    discount_type: '',
    discount_value:0,
    stock:0,
    pub_date : Date
  };

  selectedFile: File | null = null;  // To store the selected file
  selectedCategoryId: any;

  constructor(private bookService: AddBookService,private dialog: MatDialog,private snackBar:MatSnackBar) {}
  ngOnInit(): void {
    this.getcategory();
  }

  getcategory(){
    console.log("category aa gai")
    this.bookService.getCategory().subscribe((response)=>{
      this.data = response.categoryData;
      console.log(this.data)
    },(error)=>{})
  }
 

 

  
  // Handle file change event
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];  // Get the first file
  }

 

  onCategoryChange(event: any) {
    this.selectedCategoryId = event.target.value;
    console.log("Selected Category ID:", this.selectedCategoryId);
  }

calculateOfferPrice() {
  const { price, discount_type, discount_value } = this.add_book;

  if (!price || !discount_type || !discount_value) {
    this.add_book.offer_price = 0;
    return;
  }

  if (discount_type === 'amount') {
    this.add_book.offer_price = price - discount_value;
  } else if (discount_type === 'percent') {
    this.add_book.offer_price = price - (price * discount_value) / 100;
  } else {
    this.add_book.offer_price = price; // default
  }
}


  
  addBook() {
    console.log("add book")
    console.log(this.add_book.title, this.add_book.author, this.add_book.description,
      this.add_book.price,this.selectedFile,this.selectedCategoryId,this.add_book.offer_price,this.add_book.discount_type,this.add_book.discount_value,this.add_book.stock,this.add_book.pub_date)


    if (this.selectedFile && this.add_book.title && this.add_book.author && this.add_book.price && this.add_book.description) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);  // Add the image file
      formData.append('title', this.add_book.title);
      formData.append('author', this.add_book.author);
      formData.append('description', this.add_book.description);
      formData.append('price', this.add_book.price);  // Ensure price is a string
      formData.append('category_id', this.selectedCategoryId);
      formData.append('offer_price', this.add_book.offer_price.toString());
      formData.append('discount_value', this.add_book.discount_value.toString());
      formData.append('discount_type', this.add_book.discount_type);
      formData.append('stock', this.add_book.stock.toString());
      formData.append('pud_date', this.add_book.pub_date.toString());



     
      console.log(formData)

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message: `Are you sure you want to add new product the status ?` }
      });

      dialogRef.afterClosed().subscribe(result => {
        debugger
        if (result) {
          debugger
          console.log(result)
          this.bookService.submitbook(formData).subscribe(
            (response: any) => {
              this.add_book = {
                title: '',
                author: '',
                description: '',
                image: null,  
                category_name:'',
                price: null,
                offer_price:0,
                discount_type: '',
                discount_value:0,
                stock:0,
                pub_date : Date
              };
              this.snackBar.open('product add successfully ✅ !', 'close' , {duration:3000, horizontalPosition: 'center', verticalPosition: 'top'})
            },
            (error) => {
              console.error('Error:', error);
              this.snackBar.open(' some error to add product ❌ !', 'close' , {duration:3000, horizontalPosition: 'center',  verticalPosition: 'top'})

            }
          );
        }
      });
    }

      // Call the service to send the form data to the backend
   
    } 
  }

  
