import { CommonModule } from '@angular/common';
import {  Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet, RouterLinkActive],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {

  private channel = new BroadcastChannel('auth_channel');
  private selectedFile!: File;
  public previewImage: any;
  public user_id: any;
  public user: any;
  public profileImage: any;
  public image: any;
  public username!: string | null;
  private baseUrl = environment.BaseUrl



  constructor(
    private admin: AlluserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
   
    this.username = localStorage.getItem('userName');
     this.getImage();
  }

  logout() {
    console.log('User logout up!');
    this.channel.postMessage({ type: 'logout' });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadProfilePicture();
  }

  uploadProfilePicture() {
    if (!this.selectedFile) {
      alert('Please select a file!');
      return;
    }

    console.log(this.selectedFile);
    this.user_id = localStorage.getItem('user_id');
    this.admin.uploadProfilePicture(this.user_id, this.selectedFile).subscribe(
      (response) => {

        alert(response.message);
        this.getImage();
      },
      (error) => {
        alert('Error updating profile');
      }
    );
  }

  getImage() {
    this.user_id = localStorage.getItem('user_id');
    this.admin.getImages(this.user_id).subscribe(
      (response) => {
        if (response && response.userData.length > 0) {
          this.image = 'http://localhost:3000' + response.userData[0].profile_image;
        } else {
          this.image = null; 
        }
        console.log(this.image, 'image');
      },
      (error) => {
        console.error('Error fetching image:', error);
        this.image = null;
      }
    );
  }
}
