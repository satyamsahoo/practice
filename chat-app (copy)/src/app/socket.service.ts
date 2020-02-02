import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import {Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {CookieService} from 'ngx-cookie-service';
import {HttpErrorResponse, HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;
  baseUrl = 'https://chatapi.edwisor.com';

  constructor(private _http : HttpClient,
              private cookie : CookieService) {
    this.socket = io(this.baseUrl);
  }

  //events to listen
  public verifyUser = () =>{
    return Observable.create((observer)=>{
      this.socket.on("verifyUser",(data)=>{
        observer.next(data);
      });
    });
  }

  public onlineUserList =() =>{
    return Observable.create((observer)=>{
      this.socket.on("online-user-list",(data)=>{
        observer.next(data);
      });
    });
  }

  public disconnect =() =>{
    return Observable.create((observer)=>{
      this.socket.on("disconnect",()=>{
        observer.next();
      });
    });
  }

  public chatByUserId =(userId)=>{
    return Observable.create((observer)=>{
      this.socket.on(userId,(data)=>{
        observer.next(data);
      })
    })
  }

  //events to emit

  public setUser = (authToken) =>{
    this.socket.emit("set-user",authToken)
  }

  public sendChatMessage = (chatMessageObject) =>{
    console.log('Send chat messge func called from socketservice emit');
    
    this.socket.emit("chat-msg",chatMessageObject);
  }

  public markChatSeen = (userDetails)=>{
    console.log('Mark-chat-as-seen function called of socket service emit');
    
    this.socket.emit("mark-chat-as-seen",userDetails);
  }

  public getChat(senderId, receiverId, skip): Observable<any> {
    return this._http.get(`${this.baseUrl}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${this.cookie.get('authToken')}`)
      .do(data => console.log('Data Received'))
      .catch(this.handleError);
    //return this._http.get(`${this.baseUrl}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}`);
  }

  public exitSocket=()=>{
    this.socket.disconnect();
  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError

}
