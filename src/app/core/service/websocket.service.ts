import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

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

  joinRoom(roomId: string) {
    this.stompClient.connect({}, ()=>{
      this.stompClient.subscribe('/topic/notifications', (messages: any) => {
        // const messageContent = JSON.parse(messages.body);
        // const currentMessage = this.messageSubject.getValue();

        // this.messageSubject.next(currentMessage);
        console.log('value',messages.body)

      })
    })
  }
}
