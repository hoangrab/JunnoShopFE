import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpCustomeInterceptor } from './core/interceptor/httpcustome.interceptor';
import { CommonModule } from '@angular/common';
import { ClientModule } from './modules/client/client.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    GoogleSigninButtonModule,
    SocialLoginModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '91816403702-j39rmp6ffb9l8gjarjghg71h24q7q1at.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('328541830258338')
          }
        ],
        onError: (err : any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass: HttpCustomeInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
