import { Component } from '@angular/core';
import { OrderService } from 'src/app/core/service/order.service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent {

  ma : any
  orderDetail : any

  constructor(private orderSv : OrderService){}

  tracuu() {
    this.orderSv.getByMa(this.ma).subscribe(param => this.orderDetail = param)
  }
}
