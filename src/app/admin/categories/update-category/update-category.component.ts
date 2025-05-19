import { Component, OnInit } from '@angular/core';
import { FormValidation } from '../../validation/form-validation';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../categories-services/category.service';
import { category } from '../category-interface/category.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})

export class UpdateCategoryComponent implements OnInit{
 public updateCategoryForm! : FormGroup
 public category_id! : number
 public categoryData! : category;
 public selectedFile! : File
 public imageBaseUrl = environment.BaseUrl

 constructor(private categoryService:CategoryService, private activate:ActivatedRoute){}

  ngOnInit(): void {
    this.activate.paramMap.subscribe((paramp) => {
    this.category_id = Number(paramp.get('id'));
     this.getCategoryById();
    });

     this.updateCategoryForm = new FormGroup({
      category_name: new FormControl('', [
        Validators.required,
        Validators.maxLength(20)
      ]),
      category_description: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ]),
      category_image: new FormControl(''),
    });


  }

  getCategoryById(){
    this.categoryService.getCategoryById(this.category_id).subscribe((response)=>{
      this.categoryData = response.categoryData
      console.log(response.categoryData,this.categoryData);
      this.updateCategoryForm.patchValue({
        category_name : this.categoryData.category_name,
        category_description : this.categoryData.description,
        category_image : this.categoryData.image
      })
      console.log(this.updateCategoryForm)
    },()=>{})
  }

    onFileChange(event: any) {
    let file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  updateCategory(){ 
    console.log(this.updateCategoryForm.value)
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      } 
      formData.append(
        'category_name',
        this.updateCategoryForm.get('category_name')?.value
      );
      formData.append(
        'category_description',
        this.updateCategoryForm.get('category_description')?.value
      );
      formData.append(
        'category_id',
        String(this.category_id)
      );

      this.categoryService.updateCategory(formData).subscribe(
        (response) => {
          this.updateCategoryForm.reset();
          alert('category update successfully');
        },
        (error) => {
          alert('Error category update');
        }
      );
    
  }

}
