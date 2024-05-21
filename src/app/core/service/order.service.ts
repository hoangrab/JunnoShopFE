import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlApi } from '../env/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }

  getAll() {
    return this.http.get(`${BaseUrlApi.url}orders`)
  }

  getByMa(ma : string) {
    return this.http.get(`${BaseUrlApi.url}order/${ma}`)
  }

  getOrderByUser(id : string) {
    return this.http.get(`${BaseUrlApi.url}orders?idUser=${id}`);
  }
}
