import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlApi } from '../env/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient){}
  
  getAll() {
    return this.http.get(`${BaseUrlApi.url}products`);
  }

  getById(id : string) {
    return this.http.get(`${BaseUrlApi.url}product/${id}`);
  }

  create(formdata : FormData) {
    return this.http.post(`${BaseUrlApi.url}product`,formdata);
  }

  update(formdata : FormData, id : string) {
    return this.http.put(`${BaseUrlApi.url}/${id}`,formdata);
  }

  delete(id : string) {
    return this.http.delete(`${BaseUrlApi.url}/${id}`);
  }
}
