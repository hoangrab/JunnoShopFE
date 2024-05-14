import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent {
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    console.log(route)
    this.router.navigateByUrl(route);
  }
}
