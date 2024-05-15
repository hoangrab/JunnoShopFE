import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CouponService } from 'src/app/core/service/coupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrls: ['./coupon-add.component.css']
})
export class CouponAddComponent {
  formVip !: FormGroup;

  constructor(private builder : FormBuilder, private couponSv : CouponService, private router : Router) {}

  ngOnInit() {
    this.formVip = this.builder.group({
      code : ['', Validators.compose([Validators.required])],
      percent: [0,Validators.compose([Validators.max(100),Validators.min(0)])],
      dateStart : ['',Validators.required],
      dateEnd : ['',Validators.required]
    })
  }

  onsubm() {
    if(this.formVip.invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'Thông tin nhập không hợp lệ',
      });
    }
    else {
      Swal.fire({
        title: "Bạn có chắc chắn?",
        text: "Bạn có muốn lưu mã giảm giá này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Lưu",
        cancelButtonText: 'Quay lại'
      }).then((result) => {
        if (result.isConfirmed) {
          const values = this.formVip.getRawValue();
          const formdata = new FormData();
          formdata.append('code',values.code)
          formdata.append('percent',values.percent)
          formdata.append('dateStart',values.dateStart)
          formdata.append('dateEnd',values.dateEnd)
          this.couponSv.create(formdata).subscribe({
            next : (value) => {
              Swal.fire({
                title: "Save!",
                text: "Tên danh mục đã được lưu",
                icon: "success"
              });
            },
            error : (err) => {
              console.log(err)
              Swal.fire({
                icon: "error",
                title: "Lưu thất bại",
                text: 'Đã xảy ra lỗi khi lưu',
              });
            },
          })
        }
      });
    }
  }

  quaylai() {
    this.router.navigate(['/admin/coupon'])
  }
}
