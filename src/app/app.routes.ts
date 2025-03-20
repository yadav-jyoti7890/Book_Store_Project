import { Routes } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { BookComponent } from './user/book/book.component';
import { AddBookComponent } from './admin/add-book/add-book.component';
import { HomeComponent } from './user/home/home.component';
// import { ContactComponent } from './user/contact/contact.component';
import { ViewDetailComponent } from './user/view-detail/view-detail.component';
import { OrderComponent } from './admin/order/order.component';
import { UpdateComponent } from './admin/update/update.component';
import { ReadBookComponent } from './admin/read-book/read-book.component';
import { BookUpdateComponent } from './admin/book-update/book-update.component';
import { AddCartComponent } from './user/add-cart/add-cart.component';
import { AddressComponent } from './user/address/address.component';
import { OrderItemComponent } from './admin/order-item/order-item.component';
import { MyOrderComponent } from './user/my-order/my-order.component';
import { ContactUsComponent } from './user/contact-us/contact-us.component';
import { AboutComponent } from './user/about/about.component';
import { AuthGuard } from './guard/auth.guard';
import { OrderDetailComponent } from './user/order-detail/order-detail.component';
import { ItemsComponent } from './admin/items/items.component';
import { UsersComponent } from './admin/users/users.component';
import { ContactComponent } from './admin/contact/contact.component';
import { CompanyInfoComponent } from './admin/company-info/company-info.component';
import { CompanyComponent } from './admin/company/company.component';
import { UpdateCompanyInfoComponent } from './admin/update-company-info/update-company-info.component';
import { AdminComponent } from './admin/admin/admin.component';
import { Component } from '@angular/core';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';



export const routes: Routes = [

  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  {
    path: 'admin_dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'admin_sidebar', pathMatch: 'full' },
      { path: 'admin_sidebar', component: AdminSidebarComponent, canActivate: [AuthGuard] },
      { path: 'add_book', component: AddBookComponent, canActivate: [AuthGuard] },
      { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
      { path: 'order_item', component: OrderItemComponent, canActivate: [AuthGuard] },
      { path: 'book_update/:id', component: BookUpdateComponent, canActivate: [AuthGuard] },
      { path: 'read_book', component: ReadBookComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'items/:id', component: ItemsComponent, canActivate: [AuthGuard] },
      { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
      { path: 'company_info', component: CompanyInfoComponent, canActivate: [AuthGuard] },
      { path: 'company', component: CompanyComponent, canActivate: [AuthGuard] },
      { path: 'items/:id', component: ItemsComponent, canActivate: [AuthGuard] },
      { path: 'update-company-info/:id', component: UpdateCompanyInfoComponent, canActivate: [AuthGuard] },
    
      // {path: 'book_update/:id', component:BookUpdateComponent},

    ],
  },

  // { path: 'admin', component: AdminComponent },
  { path: 'about', component: AboutComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'book', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'contact_us', component: ContactUsComponent, canActivate: [AuthGuard] },
  { path: 'view_detail/:id', component: ViewDetailComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: UpdateComponent, canActivate: [AuthGuard] },
  {
    path: 'add_cart',
    component: AddCartComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'address', component: AddressComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'address', component: AddressComponent, canActivate: [AuthGuard] },
  { path: 'my_order', component: MyOrderComponent, canActivate: [AuthGuard]},
  { path: 'order_detail/:id', component: OrderDetailComponent, canActivate: [AuthGuard]},

    

 
  // { path: '', redirectTo: 'home', pathMatch: 'full' }
];

