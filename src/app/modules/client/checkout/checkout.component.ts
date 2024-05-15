import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { CouponService } from 'src/app/core/service/coupon.service';
import { location } from 'src/app/shared/model/location';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  location = location;
  listQuan : any
  listPhuong : any

  param : any;

  formVip !: FormGroup;

  constructor( private builder : FormBuilder, private couponSv : CouponService, private router : Router){}
  ngOnInit(){
    this.formVip = this.builder.group({
      tp : [''],
      quan : [''],
      phuong: ['']
    })
  }

  changeTp() {
    const {tp,quan,phuong} = this.formVip.value
    this.listQuan = location.find( e => e.Id == tp)?.Districts
  }

  changeQuan() {
    const {tp,quan,phuong} = this.formVip.value
    console.log('quan en',quan)
    this.listPhuong = this.listQuan.find( (e : any)=> e.Id == quan)?.Wards
  }

  checkne() {
    // setInterval(() => {
    //   this.couponSv.get().subscribe({
    //     next : (value) => {
    //         console.log('goi ne', value)
    //         this.param = value;
    //     },
    //     error(err) {
    //         console.log('chay ra loi', err)
    //     },
    //   })
    // },10000)
    window.open('http://localhost:8080/api/v1/payment/create?money=1000000&content=hiban', '_blank');
  }
}
