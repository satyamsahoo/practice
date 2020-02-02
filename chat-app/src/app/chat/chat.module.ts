import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router} from '@angular/router';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'chat',component:ChatboxComponent,pathMatch:'full'}
    ]),
    SharedModule
  ],
  declarations: [ChatboxComponent]
})
export class ChatModule { }
