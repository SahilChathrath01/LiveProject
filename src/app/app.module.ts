import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerLayoutComponent } from './customer/customer-layout/customer-layout.component';
import { CustomerHeaderComponent } from './customer/customer-layout/customer-header/customer-header.component';
import { CustomerFooterComponent } from './customer/customer-layout/customer-footer/customer-footer.component';
import { HomeComponent } from './customer/home/home.component';
import { ContactComponent } from './customer/contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AdminLayoutComponent } from './Admin/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './Admin/admin-layout/admin-header/admin-header.component';
import { AdminFooterComponent } from './Admin/admin-layout/admin-footer/admin-footer.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { ManageCustomerComponent } from './Admin/manage-customer/manage-customer.component';
import { ManageContactComponent } from './Admin/manage-contact/manage-contact.component';
import { RegisterComponent } from './customer/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { UpdateProfileComponent } from './customer/update-profile/update-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageCategoryComponent } from './Admin/manage-category/manage-category.component';
import { AddCategoryComponent } from './Admin/manage-category/add-category/add-category.component';
import { UpdateCategoryComponent } from './Admin/manage-category/update-category/update-category.component';
import { ManageProductComponent } from './Admin/manage-product/manage-product.component';
import { ManageOrderComponent } from './Admin/manage-order/manage-order.component';
import { ViewProductComponent } from './customer/view-product/view-product.component';
import { ViewCategoryComponent } from './customer/view-category/view-category.component';
import { ViewOrderItemComponent } from './Admin/view-order-item/view-order-item.component';
import { ViewProfileComponent } from './customer/view-profile/view-profile.component';
import { ViewCardComponent } from './customer/view-card/view-card.component';
import { MyOrderComponent } from './customer/my-order/my-order.component';
import { ChangePasswordComponent } from './customer/change-password/change-password.component';
import { ViewProductDetailComponent } from './customer/view-product-detail/view-product-detail.component';
import { AddProductComponent } from './Admin/manage-product/add-product/add-product.component';
import { UpdateproductComponent } from './Admin/manage-product/updateproduct/updateproduct.component';
import { HttpClientModule } from '@angular/common/http'
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ReviewserviceComponent } from './customer/Review/reviewservice/reviewservice.component';
import { AddReviewComponent } from './customer/Review/reviewservice/add-review/add-review.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderTrakingComponent } from './customer/order-traking/order-traking.component';
import { ManageTrakingIdComponent } from './Admin/TrakingOrder/manage-traking-id/manage-traking-id.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerLayoutComponent,
    CustomerHeaderComponent,
    CustomerFooterComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    ErrorComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    DashboardComponent,
    ManageCustomerComponent,
    ManageContactComponent,
    RegisterComponent,
    UpdateProfileComponent,
    ManageCategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    ManageProductComponent,
    ManageOrderComponent,
    ViewProductComponent,
    ViewCategoryComponent,
    ViewOrderItemComponent,
    ViewProfileComponent,
    ViewCardComponent,
    MyOrderComponent,
    ChangePasswordComponent,
    ViewProductDetailComponent,
    AddProductComponent,
    UpdateproductComponent,
    ReviewserviceComponent,
    AddReviewComponent,
    OrderTrakingComponent,
    ManageTrakingIdComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      // autoDismiss: true,
      // timeOut: 10000,
      // preventDuplicates: true,

    }),

    BrowserAnimationsModule, // required animations module
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgSelectModule,
    FormsModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
