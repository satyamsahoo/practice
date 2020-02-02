import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';

import {RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './user/login/login.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChatModule,
    UserModule,
    SharedModule,
    RouterModule.forRoot([
      {path: 'login', component:LoginComponent, pathMatch: 'full'},
      {path:'', redirectTo: 'login', pathMatch:'full'},
      {path:'*' , component:LoginComponent},
      {path:'**', component:LoginComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
