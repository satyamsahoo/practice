import { Component, OnInit } from '@angular/core';
import {CharappService} from '../../charapp.service';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public chatService: CharappService, public cookie: CookieService,
    public router:Router) { }

  ngOnInit() {
  }

  public email:any;
  public password:any;

  public loginFunction : any = () =>{
    console.log('SignIn Function in login component called');

    let data={
      email : this.email,
      password : this.password
    }

    console.log(data);
    this.chatService.loginFunction(data).subscribe(
      data => {
        if(data.status === 200){
          console.log('LoggedIn successfully');

          console.log(data);
          

          this.cookie.set('authToken', data.data.authToken);
          this.cookie.set('receiverId',data.data.userDetails.userId);
          this.cookie.set('receiverName',data.data.userDetails.firstName +' ' + data.data.userDetails.lastName);
          
          this.chatService.setUserInformationInLocalStorage(data.data.userDetails);

          console.log('Data stored in localstorage and cookies');
          
          this.router.navigate(['/chat']);
        } else {
          console.log('Error occuerd');
          console.log(data.message);
          
        }
      }
    )
  }
  



}
