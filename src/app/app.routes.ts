import { Routes } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { AdminDashboardComponent } from './admin/admin-layout/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { BookComponent } from './user/product-info/book/book.component';
import { AddBookComponent } from './admin/Books-Info/add-book/add-book.component';
import { HomeComponent } from './user/home/home.component';
import { ViewDetailComponent } from './user/view-detail/view-detail.component';
import { BookUpdateComponent } from './admin/Books-Info/book-update/book-update.component';
import { AddCartComponent } from './user/add-cart-info/add-cart/add-cart.component';
import { AddressComponent } from './user/address-info/address/address.component';
import { MyOrderComponent } from './user/user-order-info/my-order/my-order.component';
import { ContactUsComponent } from './user/contact-us/contact-us.component';
import { AboutComponent } from './user/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { OrderDetailComponent } from './user/user-order-info/order-detail/order-detail.component';
import { Component } from '@angular/core';
import { AdminSidebarComponent } from './admin/admin-layout/admin-sidebar/admin-sidebar.component';
// import { OrderComponent, OrdersComponent } from './admin/orders/orders/orders.component';
// import { OrderItemComponent } from './admin/orders/order-item/order-item.component';
import { UsersComponent } from './admin/users-info/users-list/users.component';
import { ContactComponent } from './admin/contact/contact.component';
import { UpdateCompanyInfoComponent } from './admin/company-info/update-company-info/update-company-info.component';
import { AddCategoryComponent } from './admin/categories/add-category/add-category.component';
import { CategoryListComponent } from './admin/categories/category-list/category-list.component';
import { BookListComponent } from './admin/Books-Info/book-list/book-list.component';
import { OrdersComponent } from './admin/orders/orders/orders.component';
import { OrdersDetailListComponent } from './admin/orders/orders-details-list/oders-detail-list';
import { AddCompanyInfoComponent } from './admin/company-info/addCompany-info/addCompany-info.component';
import { CompanyInfoListComponent } from './admin/company-info/companyinfo-list/companyinfo-list.component';


export const routes: Routes = [

  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  {
    path: 'admin_dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'admin_sidebar', pathMatch: 'full' },
      { path: 'admin_sidebar', component: AdminSidebarComponent, canActivate: [AuthGuard] },
      { path: 'add_book', component: AddBookComponent, canActivate: [AuthGuard] },
      {path:  'book-list', component: BookListComponent, canActivate: [AuthGuard]},
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
      { path: 'orders-detail-list', component: OrdersDetailListComponent, canActivate: [AuthGuard] },
      { path: 'book_update/:id', component: BookUpdateComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'items/:id', component: OrdersDetailListComponent, canActivate: [AuthGuard] },
      { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
      // { path: 'items/:id', component: ItemsComponent, canActivate: [AuthGuard] },
      { path: 'update-company-info/:id', component: UpdateCompanyInfoComponent, canActivate: [AuthGuard] },
      { path: 'category', component: AddCategoryComponent, canActivate: [AuthGuard]},
      { path: 'category_list', component:CategoryListComponent, canActivate: [AuthGuard] },
      {path: 'addCompany-info', component: AddCompanyInfoComponent, canActivate: [AuthGuard]},
      {path: 'companyinfo-list', component: CompanyInfoListComponent, canActivate: [AuthGuard]}
      
    ],
  },

  // { path: 'admin', component: AdminComponent },
  { path: 'about', component: AboutComponent },
  { path: 'book', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'contact_us', component: ContactUsComponent, canActivate: [AuthGuard] },
  { path: 'view_detail/:id', component: ViewDetailComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: BookUpdateComponent, canActivate: [AuthGuard] },
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
  { path: '', redirectTo: 'home', pathMatch: 'full' }
  
];

