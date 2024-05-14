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



@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    CheckoutComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule,
  ]
})
export class ClientModule { }
