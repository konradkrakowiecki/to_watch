import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { MoviesComponent } from './movies/movies.component';
import { TvseriesComponent } from './tvseries/tvseries.component';
import { AuthorComponent } from './author/author.component';
import { MoviesService } from "./services/movies.service";
import { HttpClientModule } from "@angular/common/http";
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MoviesAddComponent } from './movies/movies-add/movies-add.component';
import { MoviesInfoComponent } from './movies/movies-info/movies-info.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InfoFormComponent } from './info-form/info-form.component';
import { TvseriesListComponent } from './tvseries/tvseries-list/tvseries-list.component';
import { TvseriesAddComponent } from './tvseries/tvseries-add/tvseries-add.component';
import { TvseriesInfoComponent } from './tvseries/tvseries-info/tvseries-info.component';
import { MoviesDeleteComponent } from './movies/movies-delete/movies-delete.component';
import { TvseriesDeleteComponent } from './tvseries/tvseries-delete/tvseries-delete.component';
import { SortByTitlePipe } from './sort-by/sort-by-title.pipe';
import { SortByToWatchPipe } from './sort-by/sort-by-to-watch.pipe';
import { SortByNumberPipe } from './sort-by/sort-by-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    MoviesComponent,
    TvseriesComponent,
    AuthorComponent,
    MoviesListComponent,
    MoviesAddComponent,
    MoviesInfoComponent,
    InfoFormComponent,
    TvseriesListComponent,
    TvseriesAddComponent,
    TvseriesInfoComponent,
    MoviesDeleteComponent,
    TvseriesDeleteComponent,
    SortByTitlePipe,
    SortByToWatchPipe,
    SortByNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
