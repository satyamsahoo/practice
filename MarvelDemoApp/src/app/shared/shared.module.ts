import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponent } from './common/common.component';
import {RouterModule,Routes} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  
  ],
  exports :[
    CommonComponent
  ],
  declarations: [CommonComponent]
})
export class SharedModule { }
