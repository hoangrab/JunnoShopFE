import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router, RouterLinkActive } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { CouponService } from 'src/app/core/service/coupon.service';
import { WebsocketService } from 'src/app/core/service/websocket.service';
import { storageUtils } from 'src/app/shared/helpers/storage';
import { cartModel } from 'src/app/shared/model/cartModel';
import { location } from 'src/app/shared/model/location';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  private messageSubscription!: Subscription;

  isLogin = false;
  location = location;
  listQuan: any
  listPhuong: any
  listProduct: cartModel[] = []
  tongtien = 0
  coupon = ''
  percent = 0
  method = true;
  param: any;

  formVip !: FormGroup;

  constructor(private builder: FormBuilder, private couponSv: CouponService,
    private router: Router, private websocketService: WebsocketService) { }
  ngOnInit() {
    this.formVip = this.builder.group({
      tp: [''],
      quan: [''],
      phuong: [''],
      method: ['false'],
      fullName: [''],
      phone: [''],
      email: [''],
      addressDetail: [''],
      transport: [''],
      note: [''],
      isPay: [true]
    })

    if (storageUtils.get('currentUser')) {
      this.isLogin = true
    }

    this.listProduct = storageUtils.get('cart');

    this.loaddata()

    this.websocketService.joinRoom()
    this.messageSubscription = this.websocketService.getMessages().subscribe(message => {
      if (message) {
        // Swal.fire({
        //   title: "Pay success!",
        //   text: "Đã thanh toán thành công",
        //   icon: "success",
        // });
        this.param = 'Đã thanh toán'
        // console.log('Received message:', message);
        message = null;
        let timerInterval: any;
        Swal.fire({
          title: "Thanh toán thành công!",
          html: "Sẽ quay lại trang chủ sau <b></b> s. Hãy mở email để kiểm tra đơn hàng.",
          timer: 12000,
          icon: 'success',
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey : false,
          didOpen: () => {
            Swal.showLoading(null);
            const timer = Swal.getPopup()?.querySelector("b");
            timerInterval = setInterval(() => {
              timer!.textContent = `${Math.floor(Swal.getTimerLeft()! / 1000)}`;
            }, 1000);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigate(['public/order'])
          }
        });

      }
    });
  }

  loaddata() {
    this.tongtien = 0
    this.listProduct.forEach(e => {
      this.tongtien += (e.price * e.numchoose)
    })
    this.percent = 0
  }

  changeTp() {
    const { tp, quan, phuong } = this.formVip.value
    this.listQuan = location.find(e => e.Name == tp)?.Districts
  }

  changeQuan() {
    const { tp, quan, phuong } = this.formVip.value
    console.log('quan en', quan)
    this.listPhuong = this.listQuan.find((e: any) => e.Name == quan)?.Wards
  }

  checkne() {
    const values = this.formVip.getRawValue()
    console.log(values.addressDetail)
    let str = ''
    this.listProduct.forEach(e => {
      str += (e.productItemId + '@' + e.numchoose + '#')
    })
    const svip = {
      city: values.tp,
      district: values.quan,
      ward: values.phuong,
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      addressDetail: values.addressDetail,
      note: values.note,
      money: (this.tongtien - (this.tongtien / 100 * this.percent)),
      moneyReduced : (this.tongtien / 100 * this.percent),
      idUser: storageUtils.get('currentUser').id,
      listProductItem: str
    }

    const encoder = new TextEncoder();
    const utf8Array = encoder.encode(JSON.stringify(svip));
    const binaryString = String.fromCharCode(...utf8Array);
    const base64Encoded = btoa(binaryString);


    window.open(`http://localhost:8080/api/v1/payment/create?money=${svip.money}&content=${base64Encoded}`);
  }

  checkCoupon() {
    if (this.coupon.trim() != '') {
      this.couponSv.getByCode(this.coupon).subscribe({
        next: (value) => {
          this.percent = value.percent
        },
        error: (err) => {
          this.percent = 0
          console.log(err)
        },
      })
    }
  }

  changeMethod() {
    this.method = !this.method;
  }

  onOrder() {

  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

}
