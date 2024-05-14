import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlApi } from '../env/enviroment';
import { Observable, map } from 'rxjs';
import { userDTO, userResponse } from 'src/app/shared/model/user';
import { testne } from 'src/app/shared/model/test';
import { Route } from '@angular/router';
import { storageUtils } from 'src/app/shared/helpers/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http : HttpClient) { }

  register(fullName : string,userName : string, password : string) {
    return this.http.post(`${BaseUrlApi.url}register`,{fullName,userName,password});
  }

  login(userName : string, password : string) {
    return this.http.post<userResponse>(`${BaseUrlApi.url}login`,{userName,password}).pipe(
      map(e => {
        console.log('user : ' , e.user)
        storageUtils.set('currentUser',e.user)
        storageUtils.set('accessToken',e.accessToken)
      })
    )
  }

  loginAuth(token : string) {
    return this.http.post<userResponse>(`${BaseUrlApi.url}login/oauth2`,{token}).pipe(
      map(e => {
        console.log('user : ' , e.user)
        storageUtils.set('currentUser',e.user)
        storageUtils.set('accessToken',e.accessToken)
      })
    )
  }

  isLogin() {
    return storageUtils.get('currentUser') == null;
  }

  logout() {
    storageUtils.clear();
  }

  getAll() : Observable<any>{
    return this.http.get(`${BaseUrlApi.url}users`);
  }

  update(form : FormData, id : string) {
    return this.http.put(`${BaseUrlApi.url}user/${id}`,form);
  }

  testtithoi(formdata : FormData) : Observable<any>{
    return this.http.post(`${BaseUrlApi.url}testpost`, formdata);
  }
}

