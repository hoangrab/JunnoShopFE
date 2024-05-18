import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { storageUtils } from 'src/app/shared/helpers/storage';
import { cartModel } from 'src/app/shared/model/cartModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  user : any;
  listcart : cartModel[] = []
  tongtien = 0;

  constructor(private router : Router){}

  ngOnInit() {
    // this.user = storageUtils.get('currentUser');
    // console.log(this.user)
    this.loaddata()
  }

  loaddata() {
    this.tongtien = 0
    if(storageUtils.get('cart')) {
      this.listcart = storageUtils.get('cart')
      this.listcart.forEach( e => {
        this.tongtien += (e.price * e.numchoose)
      })
    }
  }

  clearCart() {
    storageUtils.remove('cart');
    this.listcart = []
    this.tongtien = 0
  }

  deleteFromCart(idPItem : string) {
    const listmoi = this.listcart.filter( e => (e.productItemId != idPItem))
    storageUtils.remove('cart')
    if(listmoi.length > 0) {
      storageUtils.set('cart',listmoi)
    }
    this.loaddata()
  }

  changeQuantity(param : string,idPItem : string) {
    if(param == 'increase') {
      this.listcart.forEach(e => {
        if(e.numchoose < e.quantity && e.productItemId == idPItem) {
          e.numchoose++;
        }
      })
    }
    else {
      this.listcart.forEach(e => {
        if(e.numchoose > 1 && e.productItemId == idPItem) {
          e.numchoose--;
        }
      })
    }
    storageUtils.remove('cart')
    storageUtils.set('cart',this.listcart)
    this.loaddata()
  }

  ontt() {
    if(!storageUtils.get('cart')){
      Swal.fire({
        title: "Oop!",
        text: "Sản phẩm trong giỏ hàng đang trống!!!",
        icon: "error",
        timer: 2000
      });
    }
    else {
      this.router.navigate(['/public/checkout'])
    }
  }
}
