import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlApi } from '../env/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http : HttpClient) { }

  get() {
    return this.http.get(`${BaseUrlApi.url}focus`);
  }
}
