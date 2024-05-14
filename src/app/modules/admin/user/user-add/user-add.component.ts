import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/service/user.service';
import { locationUtil } from 'src/app/shared/helpers/locationUtil';
import { location } from 'src/app/shared/model/location';
import { testne } from 'src/app/shared/model/test';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {

  location = location;
  quan : any
  phuong : any
  idCity : any
  idWard : any
  formVip !: FormGroup
  urlPreview = ''
  fileImgae !: File
  testDTO !: testne;

  constructor(private userSv : UserService, private builder : FormBuilder) {}

  ngOnInit() {
    this.formVip = this.builder.group({
      city : [''],
      district : [''],
      ward : [''],
      fullName : ['',Validators.compose([Validators.required])],
      userName : ['',Validators.compose([Validators.required])],
      password : ['',Validators.compose([Validators.required])],
      repassword : ['',Validators.compose([Validators.required])],
      phone : [''],
      addressDetail : [''],
      role : ['',Validators.compose([Validators.required])],
    })
  }

  vip(id : any) {
    console.log('gia tri',id)
  }

  f() {
    return this.formVip.controls
  }

  changeImage(event : any) {
    const file: File = event.target.files[0];
    this.fileImgae = file;
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.urlPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onsubm() {
    const {fullName,userName,password,repassword,phone,city,district,ward,addressDetail,role} = this.formVip.value
    if(this.formVip.invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Nhập thông tin còn thiếu thì chịu:))",
      });
    }
    else {
      if(password != repassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Mật khẩu xác nhận không khớp",
        });
      }
      else {
        Swal.fire({
          title: "Are you sure?",
          text: "Bạn có chắc chắn thêm người dùng với những thông tin trên?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Thêm",
          cancelButtonText: 'Hủy'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Saved!",
              text: "Add user successfully",
              icon: "success"
            });
          }
        });
      }
    }
  }

  test() {
    this.testDTO = {
      file : this.fileImgae,
      userName : 'aido',
      password : '123467'
    }
    const formda = new FormData();
    if(this.fileImgae != undefined) {
      formda.append('file',this.fileImgae,this.fileImgae.name)
    }
    formda.append('userName','hoan')
    formda.append('password','123456')

    this.userSv.testtithoi(formda).subscribe({
      next(value) {
          console.log('gui thanh cong',value)
      },
      error(err) {
          console.log('da xay ra loi',err)
      },
    })
  }

  changeCity() {
    const {city,district,ward} = this.formVip.value;
    this.phuong = []
    this.quan = locationUtil.getWard(city);
  }

  changeQuan() {
    const {city,district,ward} = this.formVip.value;
    this.phuong = locationUtil.getDistrict(city,district)
  }

}
