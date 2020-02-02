import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule ,  Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlogService } from './blog.service';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'home',component:HomeComponent},
      {path:'create',component:CreateComponent},
      {path:'edit/:blogId',component:EditComponent},
      {path:'' , redirectTo:'home',pathMatch:'full'},
      {path :'view/:blogId',component:ViewComponent  }
    ])
  ],
  providers: [BlogService,HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
