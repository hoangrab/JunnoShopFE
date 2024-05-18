import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlApi } from '../env/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http : HttpClient) { }

  getreviewByIdProduct(id : string) {
    return this.http.get(`${BaseUrlApi.url}review/${id}`)
  }
  
  addReviewInProduct(idUser : string, idProduct : string, content : string, rating : string) {
    return this.http.post(`${BaseUrlApi.url}review`,{idUser,idProduct,content,rating})
  }
}
