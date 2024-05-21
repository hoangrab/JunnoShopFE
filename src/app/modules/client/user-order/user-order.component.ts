import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderService } from 'src/app/core/service/order.service';
import { storageUtils } from 'src/app/shared/helpers/storage';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent {

  clicked= false
  orderDetail : any
  listOrders : any[] = []
  user : any;

  constructor(private orderSv : OrderService, private cdr: ChangeDetectorRef){}

  ngOnInit() {
     this.orderSv.getOrderByUser(storageUtils.get('currentUser').id).subscribe({
      next:(value : any)=> {
        this.listOrders = value
        this.cdr.detectChanges();
        this.showOrderDetail(this.listOrders[0])
      },
      error(err) {
          console.log('loi',err)
      },
     })
  }

  showOrderDetail(order : any) {
    this.orderDetail = order;
    this.clicked=true
  }
}
