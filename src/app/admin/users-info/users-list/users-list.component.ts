import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../user-services/users.service';
import { BaseUnsubscribe } from '../../../baseclass/baseunsubscribe';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent
  extends BaseUnsubscribe
  implements OnInit, OnDestroy
{
  public imageBaseUrl = environment.BaseUrl;
  public selectedRole: any = '';
  public searchQuery: any = '';
  public usersData: any;
  public filterValue: any;

  ngOnInit(): void {
    this.getAllUsersFromDataBase();
  }

  constructor(private users: UsersService) {
    super();
  }

  private getAllUsersFromDataBase() {
    this.users
      .GetAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.usersData = response.users;
          // console.log('users', this.usersData);
          // console.log(this.imageBaseUrl + 'uploads/' + this.usersData[1].profile_image);
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

  public applyFilters() {
    console.log(this.selectedRole, this.searchQuery);
    if (!this.selectedRole) {
      this.getAllUsersFromDataBase();
    } else {
      this.users
        .applyFilter(this.selectedRole, this.searchQuery)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.usersData = response.filter;
            console.log('Filtered Data:', response);
          },
          error: (error) => {
            console.error('Error fetching filtered users:', error);
          },
        });
    }
  }

  ngOnDestroy() {
    this.OnDestroy;
  }
}
