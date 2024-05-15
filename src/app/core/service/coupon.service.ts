import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlApi } from '../env/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(`${BaseUrlApi.url}coupons`);
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
