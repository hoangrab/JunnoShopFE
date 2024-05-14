import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formVip !: FormGroup;
  hien = true;
  
  constructor( private builder : FormBuilder,private userSv : UserService) {}

  ngOnInit() {
    this.formVip = this.builder.group({
      fullName : ['',Validators.compose([Validators.required])],
      userName : ['',Validators.compose([Validators.email,Validators.required])],
      password : ['',Validators.compose([Validators.required, Validators.minLength(6)])],
      repassword : ['', Validators.compose([Validators.required])]
    })
  }

  chepass() {
    this.hien = !this.hien;
  }

  loginAuth() {

  }

  login() {
    if(this.formVip.invalid) {
      this.hienloi('Vui lòng điền chính xác thông tin')
    }
    else {
      const {fullName,userName,password} = this.formVip.value
      this.userSv.register(fullName,userName,password).subscribe({
        next : (value) => {
          Swal.fire({
            icon: "success",
            title: "Oops...",
            text: "Đăng ký thành công",
            timer: 2000,
          })
        },
        error : (err) => {
          console.log('errne ', err)
          if (err instanceof HttpErrorResponse) {
            this.hienloi(err.error)
          }
        },
      })
    }
  }

  hienloi(error : string) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
    });
  }
}
