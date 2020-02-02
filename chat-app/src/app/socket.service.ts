import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch'

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'https://chatapi.edwisor.com/';
  private socket;

  constructor(public http : HttpClient, public cookieService : CookieService) {
    this.socket = io(this.url);
  }

  //event to be listened

  public verifyUser = () => {

    return Observable.create((observer) =>{
      this.socket.on('verifyUser',(data) => {
        observer.next(data)
      });
    });
  }


  public onlineUserList = () =>{

    return Observable.create((observer) =>{
      this.socket.on('online-user-list',(userList)=>{
        observer.next(userList)
      });
    });
  }

  public disconnectedSocket = () =>{

    return Observable.create((observer) =>{
      this.socket.on('disconnect',()=>{
        observer.next()
      });
    });
  }

  // events to be emitted

  public setUser = (authToken)=>{

    this.socket.emit("set-user",authToken)
  }

  public markChatAsSeen =(userDetails) =>{
    this.socket.emit('mark-chat-as-seen',userDetails);
  }

  // chat related method

  public getChat(senderId, receiverId, skip): Observable<any> {

    return this.http.get(`${this.url}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${this.cookieService.get('authToken')}`)
    .do(data => console.log('Data received'))
    .catch(this.handleError);
  }

  public chatByUserId = (userId) =>{
    return Observable.create((observer) =>{
      this.socket.on(userId,(data)=>{
        observer.next(data)
      });
    });
  }

  public sendChatMessage = (chatMsgObject) =>{
    this.socket.emit("chat-msg",chatMsgObject)
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if(err.error instanceof Error){
      errorMessage = `An error occured: ${err.error.message}`;

    } else {
      errorMessage = `Server returen code : ${err.status}, error message is : `;
    }

    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }

  public exitSocket = () =>{
    this.socket.disconnect();
  }


}
