import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { IssueService } from 'src/app/issue.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private issueService : IssueService,
    private router:Router,
    private cookieService:CookieService,
    private toastr: ToastrService) { }

  public email : any;
  public password : any;

  ngOnInit() {
  }

  public goToUserDashboard=()=>{
    this.router.navigate(['/dashboard']);
  }

  public loginFunction=()=>{

    console.log('loginFunction called.');

    if(!this.email){
      this.toastr.warning('Email is required',"Warning");
    }
    else if(!this.password){
      this.toastr.warning('Password is required',"Warning");
    } else {
      
      let userData = {
        email : this.email,
        password : this.password
      }

      console.log(userData);
      
      this.issueService.loginFunction(userData).subscribe((data)=>{
        if(data.status == 200){
          this.cookieService.set('authToken',data.data.authToken);
          this.cookieService.set('receiverId',data.data.userDetails.userId);
          this.cookieService.set('receiverName',data.data.userDetails.firstName+data.data.userDetails.lastName)
          this.issueService.setUserInformationLocalStorage(data.data.userDetails);
          console.log('Login Successful')
          this.toastr.success('Login Successful!','Welcome back.')
          this.goToUserDashboard();
        } else if(data.status == 404){
          this.toastr.error(data.message,'Error');
        } else {

          this.toastr.error(data.message,"Error");
          this.router.navigate(['/server-error']);
          console.log(data.message);
          
        }
      },(error)=>{
        if(error.status ==400){
          this.toastr.error('Wrong Password.',"Error");
        }
      });
  }

  } 

}


