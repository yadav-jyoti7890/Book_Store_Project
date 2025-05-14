import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { CompanyInfoService } from '../../admin-service/company-info.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompanyInfoService } from '../../../admin-service/company-info.service';

@Component({
  selector: 'app-update-company-info',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './update-company-info.component.html',
  styleUrl: './update-company-info.component.css'
})
export class UpdateCompanyInfoComponent implements OnInit{
  address_id : number | any;
  
  // companyinfo:companyInfo =  new companyInfo();

  companyData = {
    email: '',
    email2: '',
    contact: '',
    contact2: '',
    address: ''
  };


  constructor(private activate:ActivatedRoute,private router:Router, private companyService:CompanyInfoService){}
  ngOnInit(): void {
    this.activate.paramMap.subscribe((paramp)=>{
      const address_id = paramp.get('id')
      console.log(address_id, "book_id");
      if(address_id){
       this.address_id = parseInt(address_id);
       this.getcompanyInfoforupdate()
      }
    })
  }

  getcompanyInfoforupdate(){
    this.companyService.getCompanyInfoData(this.address_id).subscribe((response)=>{
      if(response){
        console.log(response.data)
        if (response.data.length > 0) {
          this.companyData = response.data[0];  // Assign the first object from the array
        }
      }
    }, (error)=>{})
  }

  updateCompany() {
    console.log(this.address_id,this.companyData)
    this.companyService.updateCompanyInfo(this.address_id,this.companyData).subscribe(
      (response) => {
        console.log('Company updated successfully:', response);
        alert('Company details updated!');
        this.router.navigate(['/admin_dashboard/company']);

      },
      (error) => {
        console.error('Error updating company:', error);
      }
    );
  }

  

}

// export class companyInfo{
//   email:string="";
//   email2:string="";
//   contact:string="";
//   contact2:string="";
//   address:string="";
//   constructor(){
//     this.email;
//     this.email2;
//     this.contact;
//     this.contact2;
//     this.address;
//   }
// }


