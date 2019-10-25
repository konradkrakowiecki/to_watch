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
import { FormsModule } from "@angular/forms";
import { MoviesEditComponent } from './movies/movies-edit/movies-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    MoviesComponent,
    TvseriesComponent,
    AuthorComponent,
    MoviesListComponent,
    MoviesAddComponent,
    MoviesEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
