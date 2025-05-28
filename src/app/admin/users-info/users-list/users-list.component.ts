import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UsersService } from '../user-services/users.service';

import { takeUntil } from 'rxjs';
import { BaseClassComponent } from '../../../baseclass/baseclass/baseclass.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LoaderBase } from '../../../loader/loader';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule,  MatIconModule,
      MatToolbarModule,
      MatButtonModule,
      MatTableModule,
      MatPaginatorModule,
      MatInputModule,],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent
  extends LoaderBase
  implements OnInit, OnDestroy
{
  public imageBaseUrl = environment.BaseUrl;
  public selectedRole: any = '';
  public searchQuery: any = '';
  public usersData: any;
  public filterValue: any;
  public filterUsers = new FormControl('');
  public sortBy!: string;
  public sortOrder!: string;
  public totalRecords!: number;
  public pageSize = 5;
  public currentPage = 1;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit(): void {
    this.getAllUsersFromDataBase();
    this.filterUsers.valueChanges.subscribe((selectedValue) => {
      this.applyFilters(String(selectedValue));
    });
  }

  constructor(private users: UsersService) {
    super();
  }

  private getAllUsersFromDataBase() {
    this.showLoader()
      const categoryData = {
      page: this.currentPage,
      pageSize: this.pageSize,
      sortBy : this.sortBy,
      sortOrder : this.sortOrder
    };
    this.users.GetAllUsers(categoryData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.hideLoader()
          this.usersData = response.users;
            this.totalRecords = response.totalRecords;
          if (this.paginator) {
            this.paginator.length = this.totalRecords;
          }
        },
        error: (error) => {
          console.log('users get all data problem accurse');
        },
      });
  }

  public deleteUser(id: number) {
    console.log(id);
    this.users
      .deleteUsers(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          alert('user delete successfully');
        },
        error: (error) => {
          alert('user not delete successfully');
        },
      });
  }

  public applyFilters(value: string) {
    this.showLoader()
    console.log(value);
    if (!value) {
      this.getAllUsersFromDataBase();
    } else {
      this.users
        .applyFilter(value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.hideLoader()
            this.usersData = response.filter;
            console.log('Filtered Data:', response);
          },
        });
    }
  }

  public onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    console.log(this.currentPage);
    this.pageSize = event.pageSize;
    console.log(this.pageSize);
    this.getAllUsersFromDataBase();
  }

  public ascending(name: string) {
    this.sortBy = name;
    this.sortOrder = 'asc';

    this.getAllUsersFromDataBase();
  }

  public descending(name: string) {
    this.sortBy = name;
    this.sortOrder = 'desc';
    this.getAllUsersFromDataBase();
  }

  ngOnDestroy() {
    this.OnDestroy;
  }
}
