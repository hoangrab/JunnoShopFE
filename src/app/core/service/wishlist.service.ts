import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlApi } from '../env/enviroment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http : HttpClient) { }

  get(id : string) {
    return this.http.get(`${BaseUrlApi.url}wishlist/${id}`);
  }

  add(idUser: String , idProduct : string) {
    return this.http.post(`${BaseUrlApi.url}wishlist`,{idUser,idProduct});
  }

  updateProductFromWishlist(idUser: String , idProduct : string) {
    return this.http.put(`${BaseUrlApi.url}wishlist`,{idUser,idProduct});
  }
}
