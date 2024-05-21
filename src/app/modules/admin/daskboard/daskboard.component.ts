import { Component } from '@angular/core';
import { OrderService } from 'src/app/core/service/order.service';

@Component({
  selector: 'app-daskboard',
  templateUrl: './daskboard.component.html',
  styleUrls: ['./daskboard.component.css']
})
export class DaskboardComponent {

  listOrder : any

  constructor(private orderSv  : OrderService){}

  ngOnInit() {
    this.orderSv.getAll().subscribe({
      next : (value) =>{
          this.listOrder = value;
      },
      error(err) {
          console.log('err :',err)
      },
    })
  }
}
