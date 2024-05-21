import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DaskboardComponent } from './daskboard/daskboard.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { FeetbackComponent } from './feetback/feetback.component';
import { OrderComponent } from './order/order.component';
import { CouponComponent } from './coupon/coupon.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { CouponAddComponent } from './coupon/coupon-add/coupon-add.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { CouponEditComponent } from './coupon/coupon-edit/coupon-edit.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { RouterModule } from '@angular/router';
import { ProductEditComponent } from './product/product-edit/product-edit.component';



@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    UserAddComponent,
    UserEditComponent,
    CouponAddComponent,
    CouponComponent,
    CategoryComponent,
    CategoryEditComponent,
    ProductAddComponent,
    UserComponent,
    CategoryEditComponent,
    CouponEditComponent,
    OrderComponent,
    OrderDetailComponent,
    ProductComponent,
    ProductEditComponent,
    DaskboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
