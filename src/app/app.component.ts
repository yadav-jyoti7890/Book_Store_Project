import { Component, computed, OnInit, viewChild, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './authentication/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin/admin-layout/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './user/home-page/home/home.component';
import { ViewDetailComponent } from './user/view-info/view-detail/view-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BaseClassComponent } from './baseclass/baseclass/baseclass.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    HttpClientModule,
    AdminDashboardComponent,
    ViewDetailComponent,
    MatSnackBarModule,
    BaseClassComponent,
    
   ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
 
  
 
}
