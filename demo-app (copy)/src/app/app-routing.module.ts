import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewBlogComponent} from './view-blog/view-blog.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';



@NgModule({
  exports: [
    RouterModule
  ],
  imports:[
    RouterModule.forRoot([
      {path:'blogs', component: ViewBlogComponent},
      {path:'dashboard', component: DashboardComponent},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {path:'detail/:id',component: BlogDetailComponent }
    ])
  ],
  declarations: [
    ]
})
export class AppRoutingModule {}
