import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CouponService } from 'src/app/core/service/coupon.service';

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
}
