import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CouponService } from 'src/app/core/service/coupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent {

  listCoupons : any

  constructor(private router: Router, private couponSv : CouponService) {}

  ngOnInit() {
    this.couponSv.get().subscribe(parm => this.listCoupons = of(parm)) 
  }

  navigateTo(route: string): void {
    console.log(route)
    this.router.navigateByUrl(route);
  }

  deleteCoup(id :string) {
    Swal.fire({
      title: "Are you sure?",
      text: "Bạn có chắc chắn xóa mã giảm giá này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.couponSv.delete(id).subscribe({
          next : (value) => {
            this.couponSv.get().subscribe(parm => this.listCoupons = of(parm)) 
            console.log('ok')
          },
          error(err) {
              console.log('err',err)
          },
        })
      }
    });
  }
}
