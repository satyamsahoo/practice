import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule ,  Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import {HomeComponent } from './view/home/home.component';
import { AppComponent } from './app.component';
import { ViewModule } from './view/view.module';
import { CharactersComponent } from './view/characters/characters.component';
import { ComicsComponent } from './view/comics/comics.component';
import { SeriesComponent } from './view/series/series.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'home',component:HomeComponent},
      {path:'characters',component:CharactersComponent},
      {path:'comics',component:ComicsComponent},
      {path:'series',component:SeriesComponent},
      {path:'', redirectTo:'home', pathMatch: 'full'},
      {path:"*", component:HomeComponent},
      {path: "**", component: HomeComponent}
    ]),
    ViewModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
