import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../../socket.service';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ChatMessage } from './chat';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
  providers: [SocketService]
})
export class ChatboxComponent implements OnInit {

  @ViewChild('scrollMe', {read: ElementRef})

  public scrollMe : ElementRef;
  public authToken:any;
  public userInfo:any;
  public receiverId:any;
  public receiverName:any;
  public scrollToChatTop : boolean = false;
  public previousChatList : any =[];
  public messageText :any;
  public messageList :any =[];
  public userList:any = [];
  public disconnectedSocket: boolean;
  public loadingPreviousChat : boolean = false;
  public pageValue : number = 0;

  constructor(
    public appService: AppService,
    public socketService: SocketService,
    public router: Router,
    private cookieService : CookieService
  ) { 
    this.receiverId  = cookieService.get('receiverId');
    this.receiverName = cookieService.get('receiverName');
  }

  ngOnInit() {
    this.authToken = this.cookieService.get('authToken');
    this.userInfo = this.appService.getUserInfoFromLocalstorage();
    this.receiverId = this.cookieService.get('receiverId');
    this.receiverName = this.cookieService.get('receiverName');

    console.log(this.receiverId, this.receiverName)
    if(this.receiverId!=null && this.receiverId!=undefined && this.receiverId!=''){
      this.userSelectedToChat(this.receiverId, this.receiverName);
    }
    this.checkStatus();
    this.verifyUserConfirmation();
    this.getOnlineUserList();
    this.getMessageFromAUser();
  }

  public checkStatus: any = ()=>{
    if(this.cookieService.get('authToken') === 'undefined' || this.cookieService.get('authToken') === ''){

      this.router.navigate(['/']);
      return false;

    } else {
      return true;
    }
  }

  public verifyUserConfirmation: any=() =>{
    this.socketService.verifyUser().subscribe((data)=>{
      this.disconnectedSocket = false;
      this.socketService.setUser(this.authToken);
    })
  }

  public getOnlineUserList: any = ()=>{
    this.socketService.onlineUserList().subscribe((userList)=>{
      this.userList = [];

      for( let x in userList){
        let temp = {'userId': x, 'name':userList[x], 'unread':0, 'chatting': false};
        this.userList.push(temp); 
      }

      console.log(this.userList);
    })
  }
    
  public sendMessageUsingKeyPress: any = (event :any) =>{
    if(event.keyCode == 13){
      this.sendMessage();
    }
  }

  public sendMessage:any =() =>{

    if(this.messageText){
      let chatMsgObject : ChatMessage = {
        senderName : this.userInfo.firstName + " " + this.userInfo.lastName,
        senderId : this.userInfo.senderId,
        receiverName : this.cookieService.get('receiverName'),
        receiverId : this.cookieService.get('receiverid'),
        message : this.messageText,
        createdOn : new Date()
      }

      console.log(chatMsgObject);
      this.socketService.sendChatMessage(chatMsgObject);
      this.pushToChatWindow(chatMsgObject);

    } else{
      //warning.
    }
  }

  public pushToChatWindow: any = (data)=>{
    this.messageText='';
    this.messageList.push(data);
    this.scrollToChatTop = false;
  }

  public getMessageFromAUser: any=() =>{
    this.socketService.chatByUserId(this.userInfo.userId).subscribe((data)=>{
      (this.receiverId==data.senderId)?this.messageList.push(data):'';
      //success
      this.scrollToChatTop=false;
    })
  }

  public userSelectedToChat:any = (id, name) =>{
    console.log("setting user as active")

    this.userList.map((user)=>{
      if(user.userId==id){
        user.chatting = true;
      } else{
        user.chatting = false;
      }
    })

    this.cookieService.set('receiverId',id);
    this.cookieService.set('receiverName',name);

    this.receiverName = name;
    this.receiverId = id;

    this.messageList=[];
    this.pageValue = 0;

    let chatDetails = {
      userId : this.userInfo.userId,
      senderId : id
    }

    this.socketService.markChatAsSeen(chatDetails);
    this.getPreviousChatWithAUser();
  }

  public getPreviousChatWithAUser: any = () =>{
    
    let previousData = (this.messageList.length > 0? this.messageList.slice() : []);
    this.socketService.getChat(this.userInfo.userId, this.receiverId, this.pageValue * 10)
    .subscribe((apiResponse) =>{
      console.log(apiResponse)
      if(apiResponse.status ==200){
        this.messageList = apiResponse.data.concat(previousData)
      } else {
        this.messageList = previousData;
        // no message available
      }
    })  
  }

  public loadEarlierPageOfChat : any = () =>{
    this.loadingPreviousChat = true;

    this.pageValue++;
    this.getPreviousChatWithAUser();
  }


  public logout: any = () =>{

    this.appService.logout().subscribe((apiResponse) =>{
      if(apiResponse.status == 200) {
        console.log("logout called")
        this.cookieService.delete('authToken')
        this.cookieService.delete('receiverName')
        this.cookieService.delete('receiverId')
        this.socketService.exitSocket()
        this.router.navigate(['/']);
      } else {
        console.log(apiResponse.message)
      }
    },
      (err) =>{
        console.log('some error occured.')
      
    });
  }


}
