import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CharactersComponent } from './characters/characters.component';
import { ComicsComponent } from './comics/comics.component';
import { SeriesComponent } from './series/series.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { ComicsDetailComponent } from './comics-detail/comics-detail.component';
import { CharactersDetailComponent } from './characters-detail/characters-detail.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [HomeComponent, CharactersComponent, ComicsComponent, SeriesComponent, SeriesDetailComponent, ComicsDetailComponent, CharactersDetailComponent]
})
export class ViewModule { }
