import { Routes } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { AdminDashboardComponent } from './admin/admin-layout/admin-dashboard/admin-dashboard.component';
import { BookComponent } from './user/product-info/book/book.component';
import { AddBookComponent } from './admin/Books-Info/add-book/add-book.component';
import { HomeComponent } from './user/home-page/home/home.component';
import { ViewDetailComponent } from './user/view-info/view-detail/view-detail.component';
import { BookUpdateComponent } from './admin/Books-Info/book-update/book-update.component';
import { AddCartComponent } from './user/add-cart-info/add-cart/add-cart.component';
import { AddressComponent } from './user/address-info/address/address.component';
import { MyOrderComponent } from './user/user-order-info/my-order/my-order.component';
import { ContactUsComponent } from './user/contact-info/contact-us/contact-us.component';
import { AboutComponent } from './user/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { OrderDetailComponent } from './user/user-order-info/order-detail/order-detail.component';
import { Component } from '@angular/core';
import { AdminSidebarComponent } from './admin/admin-layout/admin-sidebar/admin-sidebar.component';
import { UpdateCompanyInfoComponent } from './admin/company-info/update-company-info/update-company-info.component';
import { AddCategoryComponent } from './admin/categories/add-category/add-category.component';
import { CategoryListComponent } from './admin/categories/category-list/category-list.component';
import { BookListComponent } from './admin/Books-Info/book-list/book-list.component';
import { OrdersComponent } from './admin/orders/orders/orders.component';
import { AddCompanyInfoComponent } from './admin/company-info/addCompany-info/addCompany-info.component';
import { CompanyInfoListComponent } from './admin/company-info/companyinfo-list/companyinfo-list.component';
import { OrdersDetailListComponent } from './admin/orders/orders-details-list/orders-detail-list';
import { UsersListComponent } from './admin/users-info/users-list/users-list.component';
import { ContactComponent } from './admin/contact-info/contact/contact.component';
import { UpdateCategoryComponent } from './admin/categories/update-category/update-category.component';
import { unsavedChangesGuard } from './candeactive-guards/unsaved-changes';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./user/home-page/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },

  {
    path: 'signup',
    loadComponent: () =>
      import('./authentication/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'admin_dashboard',
    loadComponent: () =>
      import(
        './admin/admin-layout/admin-dashboard/admin-dashboard.component'
      ).then((m) => m.AdminDashboardComponent),
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'admin_sidebar', pathMatch: 'full' },
      {
        path: 'admin_sidebar',
        loadComponent: () =>
          import(
            './admin/admin-layout/admin-sidebar/admin-sidebar.component'
          ).then((m) => m.AdminSidebarComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'add_book',
        loadComponent: () =>
          import('./admin/Books-Info/add-book/add-book.component').then(
            (m) => m.AddBookComponent
          ),
        canActivate: [AuthGuard],
        canDeactivate: [unsavedChangesGuard],
      },
      {
        path: 'book-list',
        loadComponent: () =>
          import('./admin/Books-Info/book-list/book-list.component').then(
            (m) => m.BookListComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./admin/orders/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'orders-detail-list',
        loadComponent: () =>
          import('./admin/orders/orders-details-list/orders-detail-list').then(
            (m) => m.OrdersDetailListComponent
          ),
        canActivate: [AuthGuard],
      },

      {
        path: 'book_update/:id',
        loadComponent: () =>
          import('./admin/Books-Info/book-update/book-update.component').then(
            (m) => m.BookUpdateComponent
          ),
        canActivate: [AuthGuard],
        canDeactivate: [unsavedChangesGuard],
      },

      {
        path: 'update-category/:id',
        loadComponent: () =>
          import(
            './admin/categories/update-category/update-category.component'
          ).then((m) => m.UpdateCategoryComponent),
        canActivate: [AuthGuard],
        canDeactivate: [unsavedChangesGuard],
      },
      {
        path: 'users-list',
        loadComponent: () =>
          import('./admin/users-info/users-list/users-list.component').then(
            (m) => m.UsersListComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'items/:id',
        loadComponent: () =>
          import('./admin/orders/orders-details-list/orders-detail-list').then(
            (m) => m.OrdersDetailListComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./admin/contact-info/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'update-company-info/:id',
        loadComponent: () =>
          import(
            './admin/company-info/update-company-info/update-company-info.component'
          ).then((m) => m.UpdateCompanyInfoComponent),
        canActivate: [AuthGuard],
        canDeactivate: [unsavedChangesGuard],
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./admin/categories/add-category/add-category.component').then(
            (m) => m.AddCategoryComponent
          ),
        canActivate: [AuthGuard],
        canDeactivate: [unsavedChangesGuard],
      },
      {
        path: 'category_list',
        loadComponent: () =>
          import(
            './admin/categories/category-list/category-list.component'
          ).then((m) => m.CategoryListComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'addCompany-info',
        loadComponent: () =>
          import(
            './admin/company-info/addCompany-info/addCompany-info.component'
          ).then((m) => m.AddCompanyInfoComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'companyinfo-list',
        loadComponent: () =>
          import(
            './admin/company-info/companyinfo-list/companyinfo-list.component'
          ).then((m) => m.CompanyInfoListComponent),
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./user/about/about.component').then((m) => m.AboutComponent),
  },

  {
    path: 'book',
    loadComponent: () =>
      import('./user/product-info/book/book.component').then(
        (m) => m.BookComponent
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'contact_us',
    loadComponent: () =>
      import('./user/contact-info/contact-us/contact-us.component').then(
        (m) => m.ContactUsComponent
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'view_detail/:id',
    loadComponent: () =>
      import('./user/view-info/view-detail/view-detail.component').then(
        (m) => m.ViewDetailComponent
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'update/:id',
    loadComponent: () =>
      import('./admin/Books-Info/book-update/book-update.component').then(
        (m) => m.BookUpdateComponent
      ),
    canActivate: [AuthGuard],
    canDeactivate: [unsavedChangesGuard],
  },

  {
    path: 'add_cart',
    loadComponent: () =>
      import('./user/add-cart-info/add-cart/add-cart.component').then(
        (m) => m.AddCartComponent
      ),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'address',
        loadComponent: () =>
          import('./user/address-info/address/address.component').then(
            (m) => m.AddressComponent
          ),

        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: 'my_order',
    loadComponent: () =>
      import('./user/user-order-info/my-order/my-order.component').then(
        (m) => m.MyOrderComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'order_detail/:id',
    loadComponent: () =>
      import('./user/user-order-info/order-detail/order-detail.component').then(
        (m) => m.OrderDetailComponent
      ),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

//  { path: 'home', component: HomeComponent},
//   { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
//   {
//     path: 'admin_dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard],
//     children: [
//       { path: '', redirectTo: 'admin_sidebar', pathMatch: 'full' },
//       { path: 'admin_sidebar', component: AdminSidebarComponent, canActivate: [AuthGuard] },
//       { path: 'add_book', component: AddBookComponent, canActivate: [AuthGuard] },
//       {path:  'book-list', component: BookListComponent, canActivate: [AuthGuard]},
//       { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
//       { path: 'orders-detail-list', component: OrdersDetailListComponent, canActivate: [AuthGuard] },
//       { path: 'book_update/:id', component: BookUpdateComponent, canActivate: [AuthGuard] },
//       { path: 'users-list', component: UsersListComponent, canActivate: [AuthGuard] },
//       { path: 'items/:id', component: OrdersDetailListComponent, canActivate: [AuthGuard] },
//       { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
//       { path: 'update-company-info/:id', component: UpdateCompanyInfoComponent, canActivate: [AuthGuard] },
//       { path: 'category', component: AddCategoryComponent, canActivate: [AuthGuard]},
//       { path: 'category_list', component:CategoryListComponent, canActivate: [AuthGuard] },
//       {path: 'addCompany-info', component: AddCompanyInfoComponent, canActivate: [AuthGuard]},
//       {path: 'companyinfo-list', component: CompanyInfoListComponent, canActivate: [AuthGuard]},
//       {path: 'update-category/:id', component: UpdateCategoryComponent, canActivate: [AuthGuard]}
//     ],
//   },

//   { path: 'about', component: AboutComponent },
//   { path: 'book', component: BookComponent, canActivate: [AuthGuard] },
//   { path: 'contact_us', component: ContactUsComponent, canActivate: [AuthGuard] },
//   { path: 'view_detail/:id', component: ViewDetailComponent, canActivate: [AuthGuard] },
//   { path: 'update/:id', component: BookUpdateComponent, canActivate: [AuthGuard] },
//   {
//     path: 'add_cart',
//     component: AddCartComponent,
//     canActivate: [AuthGuard],
//     children: [
//       { path: 'address', component: AddressComponent, canActivate: [AuthGuard] }
//     ]
//   },
//   { path: 'address', component: AddressComponent, canActivate: [AuthGuard] },
//   { path: 'my_order', component: MyOrderComponent, canActivate: [AuthGuard]},
//   { path: 'order_detail/:id', component: OrderDetailComponent, canActivate: [AuthGuard]},

//   { path: '', redirectTo: 'home', pathMatch: 'full' }

// ];
