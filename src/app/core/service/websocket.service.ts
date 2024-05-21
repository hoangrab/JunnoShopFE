import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient: any
  private messageSubject: BehaviorSubject<String> = new BehaviorSubject<String>('');

  constructor() { 
    this.initConnenctionSocket();
  }

  initConnenctionSocket() {
    const url = '//localhost:8080/ws';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket)
    console.log('ket noi ok')
  }

  joinRoom() {
    this.stompClient.connect({}, ()=>{
      this.stompClient.subscribe('/topic/notifications', (messages: any) => {
        this.messageSubject.next('hiban')
      })
    })
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
