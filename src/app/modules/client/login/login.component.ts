
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Route, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { UserService } from 'src/app/core/service/user.service';
import { storageUtils } from 'src/app/shared/helpers/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authSubscription!: Subscription;
  dem = 0;
  formVip !: FormGroup
  constructor(private authService: SocialAuthService, private builder : FormBuilder,
              private userSv : UserService,private router : Router) { }

  ngOnInit() {
    this.formVip = this.builder.group({
      userName : ['',Validators.required],
      password : ['',Validators.required]
    })
    this.authSubscription = this.authService.authState.subscribe((user) => {
      // fix automatic login when logout
      if(this.userSv.isLogin() && this.authSubscription) {
          this.userSv.loginAuth(user.idToken).subscribe({
            next : (value) => {
              Swal.fire({
                icon: "success",
                title: "Oops...",
                text: "Đăng nhập thành công",
                timer: 2000,
              }).then(() => {
                  this.router.navigate(['/trang-chu']);
              });
            },
            error(err) {
                console.log('co loi',err)
            },
        })
        }
    });
  }
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  // face rách ko cho login với http
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  hienloi(error : string) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
    });
  }

  login() {
    const {userName,password} = this.formVip.value
    if(this.formVip.invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng điền đầy đủ thông tin",
      });
    }
    else {
      console.log(userName,password)
      console.log(storageUtils.get('ok'))
      this.userSv.login(userName,password).subscribe({
        next : (value) => {
          console.log('b')
          Swal.fire({
            icon: "success",
            title: "Oops...",
            text: "Đăng nhập thành công",
            timer: 2000,
          }).then(() => {
              this.router.navigate(['/trang-chu']);
          });
        },
        error : (err) =>{
            console.log('co loi',err)
            if (err instanceof HttpErrorResponse) {
              this.hienloi(err.error)
            }
        },
      })
    }
  }
  
}
