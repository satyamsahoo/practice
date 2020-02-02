import { Component, OnInit } from '@angular/core';
import {CharappService} from '../../charapp.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName : any;
  public lastName: any;
  public mobile : any;
  public email: any;
  public password: any;
  public apikey : any;

  constructor(private chatService: CharappService, private router:Router) { }

  ngOnInit() {
  }

  public goToLogin:any=()=> {
    this.router.navigate(['/']);
  }

  public signUpFunction: any =() =>{

    console.log('SignUpFuntion of component called');
    let data = {
      firstName : this.firstName,
      lastName : this.lastName,
      mobile : this.mobile,
      email : this.email,
      password : this.password,
      apikey : this.apikey
    }

    console.log(data);

    this.chatService.signUpFunction(data).subscribe(
      data => {
        console.log(data)
        if(data.status === 200){
           console.log('SignUp Successfull');
           this.goToLogin();
        }
        else {
          console.log(data.message)
        }
      }
    )
  }



}
