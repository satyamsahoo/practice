import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IssueService } from 'src/app/issue.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public firstName : String;
  public lastName : String;
  public email : String;
  public password : String;

  constructor(private issueService : IssueService,
    private router:Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  public goToLogin=() =>{
    this.router.navigate(['/']);
  }

  public signUpFunction = () =>{
    console.log('signUpFunction called.')
    if(!this.firstName){
      this.toastr.warning('First Name is required',"Warning");
    }
    else if(!this.lastName){
      this.toastr.warning('Last Name is required',"Warning");
    }
    else if(!this.email){
      this.toastr.warning('Email is required',"Warning");
    }
    else if(!this.password){
      this.toastr.warning('password is required',"Warning");
    }
    else {
      let userData = {
        firstName : this.firstName,
        lastName : this.lastName,
        email : this.email,
        password : this.password
      }
      console.log(userData);
    this.issueService.signUpFunction(userData).subscribe((data)=>{
      if(data.status == 200){
        this.toastr.success('Signed Up Successfully.','Welcome to MeetUp!!')
        console.log('Signup Successfull.')
        setTimeout(()=>{
          this.goToLogin();
        },2000);
      } else {
        this.toastr.error(data.message,"Error");
        console.log(data.message);
        
      }
    })
   }

    
  }

}
