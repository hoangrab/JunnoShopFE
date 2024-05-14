import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CouponService } from 'src/app/core/service/coupon.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  param : any;

  constructor(private cousv : CouponService) {}

  ngOnInit() {
    this.param = this.getData();
  }

  getData(): Observable<any> {
    return new Observable<any>(observer => {
      const eventSource = new EventSource('http://localhost:8080/api/v1/stream'); // SSE endpoint
      eventSource.onmessage = event => {
        console.log('chay roi')
        observer.next(event.data); // Truyền dữ liệu tới subscriber khi có sự kiện message từ server
      };
      eventSource.onerror = error => {
        console.log('chay va loi')
        observer.error('SSE error'); // Xử lý lỗi nếu có
      };
    });
  }
}
