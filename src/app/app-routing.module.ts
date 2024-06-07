import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLayoutComponent } from './customer/customer-layout/customer-layout.component';
import { HomeComponent } from './customer/home/home.component';
import { AboutComponent } from './customer/about/about.component';
import { ContactComponent } from './customer/contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AdminLayoutComponent } from './Admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { ManageCustomerComponent } from './Admin/manage-customer/manage-customer.component';
import { ManageContactComponent } from './Admin/manage-contact/manage-contact.component';
import { RegisterComponent } from './customer/register/register.component';
import { UpdateProfileComponent } from './customer/update-profile/update-profile.component';
import { ManageCategoryComponent } from './Admin/manage-category/manage-category.component';
import { AddCategoryComponent } from './Admin/manage-category/add-category/add-category.component';
import { UpdateCategoryComponent } from './Admin/manage-category/update-category/update-category.component';
import { ManageProductComponent } from './Admin/manage-product/manage-product.component';
import { ManageOrderComponent } from './Admin/manage-order/manage-order.component';
import { adminGuard } from './Admin/guard/admin.guard';
import { customerGuard } from './customer/guard/customer.guard';
import { ViewCategoryComponent } from './customer/view-category/view-category.component';
import { ViewProductComponent } from './customer/view-product/view-product.component';
import { ViewOrderItemComponent } from './Admin/view-order-item/view-order-item.component';
import { ChangePasswordComponent } from './customer/change-password/change-password.component';
import { ViewProductDetailComponent } from './customer/view-product-detail/view-product-detail.component';
import { ViewCardComponent } from './customer/view-card/view-card.component';
import { MyOrderComponent } from './customer/my-order/my-order.component';
import { AddProductComponent } from './Admin/manage-product/add-product/add-product.component';
import { UpdateproductComponent } from './Admin/manage-product/updateproduct/updateproduct.component';
import { ViewProfileComponent } from './customer/view-profile/view-profile.component';
import { ReviewserviceComponent } from './customer/Review/reviewservice/reviewservice.component';
import { AddReviewComponent } from './customer/Review/reviewservice/add-review/add-review.component';
import { OrderTrakingComponent } from './customer/order-traking/order-traking.component';
import { ManageTrakingIdComponent } from './Admin/TrakingOrder/manage-traking-id/manage-traking-id.component';

const routes: Routes = [
  { path: '', redirectTo: '/customer-layout/home', pathMatch: 'full' },
  {
    path: 'customer-layout', component: CustomerLayoutComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'update-profile', component: UpdateProfileComponent, canActivate: [customerGuard] },
      { path: 'viewcategory', component: ViewCategoryComponent },
      { path: 'viewproduct/:id', component: ViewProductComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'view-product-detail/:id', component: ViewProductDetailComponent },
      { path: "view-card", component: ViewCardComponent },
      { path: 'my-order', component: MyOrderComponent },
      { path: 'view-order-item/:id', component: ViewOrderItemComponent },
      { path: 'view-profile', component: ViewProfileComponent },
      { path: 'review-rating', component: ReviewserviceComponent },
      { path: 'add-review', component: AddReviewComponent },
      { path: 'order_traking/:id', component: OrderTrakingComponent }


    ]
  },
  {
    path: 'admin-layout', component: AdminLayoutComponent, canActivate: [adminGuard], children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manage-customer', component: ManageCustomerComponent },
      { path: 'manage-contact', component: ManageContactComponent },
      { path: 'manage-category', component: ManageCategoryComponent },
      { path: 'manage-product', component: ManageProductComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'update-category/:id', component: UpdateCategoryComponent },
      { path: "manage-order", component: ManageOrderComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'view-order-item/:id', component: ViewOrderItemComponent },
      {path:"manage-trakingId/:id",component:ManageTrakingIdComponent},
      { path: "add-product", component: AddProductComponent },
      { path: "update-product/:id", component: UpdateproductComponent }
    ]
  },

  { path: 'login', component: LoginComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
