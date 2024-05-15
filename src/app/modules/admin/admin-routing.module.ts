import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaskboardComponent } from './daskboard/daskboard.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { FeetbackComponent } from './feetback/feetback.component';
import { CouponComponent } from './coupon/coupon.component';
import { CouponAddComponent } from './coupon/coupon-add/coupon-add.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DaskboardComponent
  },
  {
    path: 'home',
    component: DaskboardComponent
  },
  {
    path: 'trang-chu',
    component: DaskboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'order-detail',
    component: OrderDetailComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'user/add',
    component: UserAddComponent
  },
  {
    path: 'user/edit',
    component: UserEditComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'category/edit/:id',
    component : CategoryEditComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'product/add',
    component: ProductAddComponent
  },
  {
    path: 'feetback',
    component: FeetbackComponent
  },
  {
    path: 'coupon',
    component: CouponComponent,
  }, 
  {
    path: 'coupon/add',
    component: CouponAddComponent
  },
  {
    path: 'coupon/edit',
    component: CouponAddComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
