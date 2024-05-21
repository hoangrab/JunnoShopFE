import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing-module';
import { ClientComponent } from './client.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GoogleSigninButtonDirective, GoogleSigninButtonModule, SocialLoginModule } from '@abacritt/angularx-social-login';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { LookupComponent } from './lookup/lookup.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CheckoutComponent,
    RegisterComponent,
    ProductComponent,
    WishlistComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    LookupComponent,
    UserOrderComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ClientModule { }
