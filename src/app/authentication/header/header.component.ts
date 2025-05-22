import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import gsap from 'gsap';
import { ViewDetailService } from '../../user/view-info/view-services/view-detail.service';
import { AuthService } from '../auth-services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Block } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlluserService } from '../../admin/users-info/user-services/alluser.service';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public user: string | null = '';
  public admin: string | null = '';
  public user_id: any;
  public total_count: any;
  public cartCount: any;
  public protectedData: any;
  public isLoggedIn: boolean = false;
  public username: any;
  public role: any;
  public side_Menu: boolean = false;
  private channel = new BroadcastChannel('auth_channel');
  private count = new BroadcastChannel('count');
  private selectedFile: any;
  public profileImage: any;
  public image!: string | null;

  ngOnInit() {
    this.productCount();
    this.getImage();
  }

  log() {
    this.channel.onmessage = (event) => {
      if (event.data.type === 'logout') {
        this.logout();
      }
    };
  }

  side_menu() {
    if (this.side_Menu === true) {
      this.side_Menu = false;
    } else {
      this.side_Menu = true;
    }
  }

  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem('userName');
      this.role = localStorage.getItem('role');
      this.router.navigate([
        this.role === 'admin' ? './admin_dashboard' : '/home',
      ]);
    } else {
      this.isLoggedIn = false;
      this.router.navigate(['/signup']);
    }
  }

  broadcastChannelSetup(): void {
    const broadcastChannel = new BroadcastChannel('authentication');
    broadcastChannel.onmessage = (event) => {
      this.ngZone.run(() => {
        if (event.data.username && event.data.role) {
          this.username = event.data.username;
          this.role = event.data.role;
          this.isLoggedIn = true;
          this.router.navigate([
            this.role === 'admin' ? './admin_dashboard' : './user_dashboard',
          ]);
        }
      });
    };
  }

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private view_service: ViewDetailService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private userservice: AlluserService
  ) {
    this.checkLoginStatus();
    this.broadcastChannelSetup();
    this.channel.onmessage = (event) => {
      this.ngZone.run(() => {
        if (event.data.type === 'logout') {
          this.logout();
        }
      });
    };
    this.count.onmessage = (event) => {
      this.ngZone.run(() => {
        if (event.data.type === 'add_cart_count') {
          this.productCount();
        }
      });
    };
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('userName');

    this.role = null;
    this.user = null;
    this.isLoggedIn = false;
    this.router.navigate(['/signup']);
    this.snackBar.open('logout successfully ✅!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  productCount() {
    this.user_id = localStorage.getItem('user_id');
    this.view_service.total_val(this.user_id).subscribe(
      (data) => {
        if (data) {
          this.total_count = data.total_product;
          console.log(this.total_count);
        }
      },
      (error) => {}
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadProfilePicture();
  }

  // ✅ Upload Profile Picture
  uploadProfilePicture() {
    if (!this.selectedFile) {
      alert('Please select a file!');
      return;
    }

    console.log(this.selectedFile);
    this.user_id = localStorage.getItem('user_id');
    this.userservice
      .uploadProfilePicture(this.user_id, this.selectedFile)
      .subscribe(
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
    this.userservice.getImages(this.user_id).subscribe(
      (response) => {
        if (
          response &&
          response.userData.length > 0 &&
          response.userData[0].profile_image
        ) {
          this.image =
            'http://localhost:3000' + response.userData[0].profile_image;
        } else {
          this.image = null; // Default case
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
