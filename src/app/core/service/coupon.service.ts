import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlApi } from '../env/enviroment';
import { Observable, count } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(`${BaseUrlApi.url}coupons`);
  }

  getByCode(code : string) : Observable<any> {
    return this.http.get(`${BaseUrlApi.url}coupon?code=${code}`)
  }

  create(formdata: FormData) {
    return this.http.post(`${BaseUrlApi.url}coupon`, formdata);
  }

  update(formdata: FormData, id: string) {
    return this.http.put(`${BaseUrlApi.url}coupon/${id}`, formdata);
  }

  delete(id: string) {
    return this.http.delete(`${BaseUrlApi.url}coupon/${id}`);
  }
}
