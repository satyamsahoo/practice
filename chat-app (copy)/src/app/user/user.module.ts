import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {RouterModule,Route} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
     {path: 'signup', component:SignupComponent},
    ]),
    FormsModule,
    HttpClientModule
  ],
  declarations: [LoginComponent, SignupComponent]
})
export class UserModule { }
