import { Component } from '@angular/core';
import { OrderService } from 'src/app/core/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  listOrder : any;

  constructor(private orderSv : OrderService){}
  
  ngOnInit() {
    this.orderSv.getAll().subscribe(param => this.listOrder = param)
  }
}
