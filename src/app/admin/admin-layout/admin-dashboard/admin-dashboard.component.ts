import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AlluserService } from '../../users-info/user-services/alluser.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';
import { environment } from '../../../../environments/environment';

import { takeUntil } from 'rxjs';
import { BaseClassComponent } from '../../../baseclass/baseclass/baseclass.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet, RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent
  extends BaseClassComponent
  implements OnInit, OnDestroy
{
  private channel = new BroadcastChannel('auth_channel');
  private selectedFile!: File;
  public previewImage: any;
  public user_id: any;
  public user: any;
  public profileImage: any;
  public image: any;
  public username!: string | null;
  public imageBaseUrl = environment.BaseUrl;

  constructor(
    private admin: AlluserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('userName');
    this.getImage();
  }

  public logout() {
    console.log('User logout up!');
    this.channel.postMessage({ type: 'logout' });
  }

  public onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadProfilePicture();
  }

  public uploadProfilePicture() {
    if (!this.selectedFile) {
      alert('Please select a file!');
      return;
    }

    console.log(this.selectedFile);
    this.user_id = localStorage.getItem('user_id');
    this.admin
      .uploadProfilePicture(this.user_id, this.selectedFile)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          alert(response.message);
          this.getImage();
        },
        error: (error) => {
          alert('Error updating profile');
        },
      });
  }

  private getImage() {
    this.user_id = localStorage.getItem('user_id');
    this.admin
      .getImages(this.user_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response && response.userData.length > 0) {
            this.image = response.userData[0].profile_image;
          } else {
            this.image = null;
          }
          console.log(this.image, 'image');
        },
        error: (error) => {
          console.error('Error fetching image:', error);
          this.image = null;
        },
      });
  }

  ngOnDestroy() {
    this.OnDestroy();
  }
}
