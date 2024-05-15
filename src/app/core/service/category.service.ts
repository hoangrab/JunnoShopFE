import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlApi } from '../env/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  getAll() {
    return this.http.get(`${BaseUrlApi.url}categories`);
  }

  getById(id : string) {
    return this.http.get(`${BaseUrlApi.url}category/${id}`);
  }

  create(formdata : FormData) {
    return this.http.post(`${BaseUrlApi.url}category`,formdata);
  }

  update(formdata : FormData, id : string) {
    return this.http.put(`${BaseUrlApi.url}category/${id}`,formdata);
  }

  delete(id : string) {
    return this.http.delete(`${BaseUrlApi.url}category/${id}`);
  }
}
