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
import { WatchFormComponent } from './watch-form/watch-form.component';
import { TvseriesListComponent } from './tvseries/tvseries-list/tvseries-list.component';
import { TvseriesAddComponent } from './tvseries/tvseries-add/tvseries-add.component';

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
    WatchFormComponent,
    TvseriesListComponent,
    TvseriesAddComponent
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
