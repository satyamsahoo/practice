import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';

import {RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './user/login/login.component';

import {HttpClientModule} from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { SignupComponent } from './user/signup/signup.component';
import { ChatModule } from './chat/chat.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    ChatModule,
    RouterModule.forRoot([
      {path: 'login', component:LoginComponent, pathMatch: 'full'},
      {path:'', redirectTo: 'login', pathMatch:'full'},
      {path:'*' , component:LoginComponent},
      {path:'**', component:LoginComponent}
    ]),
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
