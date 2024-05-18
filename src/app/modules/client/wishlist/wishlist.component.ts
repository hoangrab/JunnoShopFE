import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CouponService } from 'src/app/core/service/coupon.service';
import { WishlistService } from 'src/app/core/service/wishlist.service';
import { storageUtils } from 'src/app/shared/helpers/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  // param : any;

  // constructor(private cousv : CouponService) {}

  // ngOnInit() {
  //   this.param = this.getData();
  // }

  // getData(): Observable<any> {
  //   return new Observable<any>(observer => {
  //     const eventSource = new EventSource('http://localhost:8080/api/v1/stream'); // SSE endpoint
  //     eventSource.onmessage = event => {
  //       console.log('chay roi')
  //       observer.next(event.data); // Truyền dữ liệu tới subscriber khi có sự kiện message từ server
  //     };
  //     eventSource.onerror = error => {
  //       console.log('chay va loi')
  //       observer.error('SSE error'); // Xử lý lỗi nếu có
  //     };
  //   });
  // }

  user: any;
  listPro: any;
  check = true;

  constructor(private wishSv: WishlistService) { }

  ngOnInit() {
    this.user = storageUtils.get('currentUser');
    if (this.user) {
      this.wishSv.get(this.user.id).subscribe(param => {
        this.listPro = param
        this.check = (Array.isArray(this.listPro) && this.listPro.length === 0)
      })
    }
  }

  removePinW(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "Bạn có chắc chắn xóa sản phẩm khỏi danh sách yêu thích?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        this.wishSv.updateProductFromWishlist(this.user.id, id).subscribe({
          next: (value) => {
            this.wishSv.get(this.user.id).subscribe(pram => this.listPro = pram)
          },
          error(err) {
            console.log('loi : ', err)
            Swal.fire({
              title: "Deleted!",
              text: "Lỗi hệ thống",
              icon: "error"
            });
          },
        })
      }
    });
  }
}
