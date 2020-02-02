import { Component, OnInit, RootRenderer } from '@angular/core';
import {SocketService} from '../../socket.service';
import {CharappService} from '../../charapp.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers :[SocketService]
})
export class ChatBoxComponent implements OnInit {

  public authToken:any;
  public receiverId :any;
  public receiverName:any;
  public userInfo:any;
  public disconnectedSocket:boolean;
  public userList : any=[];
  public messageText: any;
  public messageList : any=[];
  public pageValue : number = 0;
  public loadPreviousChat: boolean = false;
  public scrollToChatTop:boolean= false;

  constructor(private cookie : CookieService,
              private chatService: CharappService,
              private socketService: SocketService,
              private router:Router) {
    
  }

  ngOnInit() {
    this.receiverId = this.cookie.get("receiverId");
    this.receiverName = this.cookie.get("receiverName");
    this.authToken = this.cookie.get("authToken");
    this.userInfo = this.chatService.getUserInformationFromLocalStorage();

    console.log(this.receiverId + ' ' + this.receiverName);

    if(this.receiverId!=null && this.receiverId!=undefined && this.receiverId!=''){
      this.userSelectedToChat(this.receiverId,this.receiverName)
    }
    
    this.verifyUserConfirmation();
    this.getMessageFromAUser();

  }

  public verifyUserConfirmation :any =() =>{
    console.log('verifyUserConfirmation  called');
    
    this.socketService.verifyUser().subscribe(
      (data)=>{
        this.disconnectedSocket = false;
        this.socketService.setUser(this.authToken);
        this.getOnlineUserList();
      }
    )
  }

  public getOnlineUserList :any=()=>{
    console.log('getOnlineUserList called');
    
    this.socketService.onlineUserList().subscribe(
      (data)=>{
        this.userList=[];
        for(let x in data){
          let temp = {'userId':x, 'name':data[x], 'unread':0, 'chatting': false};

          this.userList.push(temp);
        }
        console.log(this.userList);
        
      }
    )
  }

  public userSelectedToChat : any =(id, name) =>{
    console.log('User selected to chat called');
    
    console.log('Setting user as active');

    this.userList.map((user)=>{
      if(user.userId == id){
        user.chatting = true;
      }
      else {
        user.chatting = false;
      }
    })

    this.cookie.set('receiverId',id);
    this.cookie.set('receiverName',name);

    console.log(id + '   ' + name);
    

    this.receiverName = name;
    this.receiverId = id;

    this.messageList=[];
    this.pageValue = 0;
    
    let chatDetails = {
      userId : this.userInfo.userId,
      senderId : id
    }

    this.socketService.markChatSeen(chatDetails);
    this.getPreviousChatWithAUser();
  }

  public getPreviousChatWithAUser : any=()=>{

    console.log('getpreviouschatwithausercalled');
    
    let previousData = (this.messageList.length>0? this.messageList.slice(): []);
    console.log(previousData);
    
    this.socketService.getChat(this.userInfo.userId,this.receiverId,this.pageValue).subscribe(
      data =>{
        if(data.status === 200) {
          console.log('success from getChat');
          
          this.messageList = data.data.concat(previousData);
        } else {
          console.log('error from getCHat in component');
          console.log(data.error);
          console.log(data.message);
          
          
          this.messageList = previousData;

        }

        this.loadPreviousChat = false;
        console.log(this.messageList.length);
        console.log(this.messageList);
        
      },
      (err)=>{
        console.log('some error occured')
      }
      
    )
  }

  public loadEarlierPageOfChat: any = () => {

    this.loadPreviousChat = true;

    this.pageValue++;
    this.scrollToChatTop = true;

    this.getPreviousChatWithAUser() 

  }

  public getMessageFromAUser:any=()=>{
    this.socketService.chatByUserId(this.userInfo.userId).subscribe(
      data=>{
        console.log('getmessagefrom a user called');
        
        console.log(data);
        (this.receiverId==data.senderId)?this.messageList.push(data):'';
        console.log(data.receiverName + ' said ' + data.message);
        this.scrollToChatTop = false;
        
      }
    )
  } 

  public sendMessageUsingKeypress : any=(event:any)=>{
    if(event.keyCode === 13){
      this.sendMessage();
    }
  }

  public sendMessage:any =()=>{
    if(this.messageText){

      let chatMsgObject = {
        senderName : this.userInfo.firstName + ' ' + this.userInfo.lastName,
        senderId : this.userInfo.userId,
        receiverName: this.cookie.get('receiverName'),
        receiverId : this.cookie.get('receiverId'),
        message : this.messageText,
        createdOn : new Date()
      }

      console.log(chatMsgObject)
      this.socketService.sendChatMessage(chatMsgObject);
      this.pushToChatWindow(chatMsgObject);
    }
  }

  public pushToChatWindow:any=(data)=>{
    this.messageText = "";
    this.messageList.push(data);
    console.log(this.messageList);
    this.getPreviousChatWithAUser();
    
    this.scrollToChatTop = false;
  }

  public logout: any = () => {

    this.chatService.logout()
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {
          console.log("logout called")
          this.cookie.delete('authtoken');

          this.cookie.delete('receiverId');

          this.cookie.delete('receiverName');

          this.socketService.exitSocket()

          this.router.navigate(['/']);

        } else {
          console.log(apiResponse.message)

        } // end condition

      }, (err) => {
        console.log('some error occured')


      });

  }

  public showUserName=(name:string)=>{
    console.log('Chatting with '+ name);
  }

}
