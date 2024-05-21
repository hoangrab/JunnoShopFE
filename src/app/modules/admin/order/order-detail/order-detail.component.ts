import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { OrderService } from 'src/app/core/service/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {

  id : any
  order : any

  constructor(private orderSv : OrderService, private route : ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || '';
      this.orderSv.getByMa(this.id).subscribe(param => this.order = param)
    });
  }
}
