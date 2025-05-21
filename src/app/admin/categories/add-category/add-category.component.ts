import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../categories-services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import '@angular/compiler';
import { ValidationComponent } from '../../../validation/validation/validation.component';
import { categoryForm } from '../category-interface/category.model';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, ValidationComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent implements OnInit {

  public categoryForm!: FormGroup<categoryForm>;
  private selectedFile: File | null = null;

  ngOnInit(): void {
    this.categoryForm = new FormGroup<categoryForm>({
      category_name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      image: new FormControl(null, [Validators.required]),
    });
  }

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  onFileChange(event: any) {
    debugger;
    let file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  insertCategory() {
    // if (this.categoryForm.valid) {
    //   const formData = new FormData();
    //   if (this.selectedFile) {
    //     formData.append('image', this.selectedFile);
    //   } else {
    //     console.error('No file selected');
    //     return;
    //   }
    //   formData.append(
    //     'category_name',
    //     this.categoryForm.get('category_name')?.value
    //   );
    //   formData.append(
    //     'category_description',
    //     this.categoryForm.get('description')?.value
    //   );

    //   this.categoryService.insertCategory(formData).subscribe(
    //     (response) => {
    //       this.categoryForm.reset();
    //       alert('category added successfully');
    //     },
    //     (error) => {
    //       alert('Error category book');
    //     }
    //   );
    // } else {
    // }
  }

//  getControl(controlName: string): FormControl {
//   return this.categoryForm.get(controlName) as FormControl;
// }
}
