import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './authentication/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './user/home/home.component';
import { ViewDetailComponent } from './user/view-detail/view-detail.component';
// import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,HomeComponent,HttpClientModule,UserDashboardComponent,AdminDashboardComponent,ViewDetailComponent,MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular-Mini-Project';
}
