import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartComponent} from "./start/start.component";
import {MoviesComponent} from "./movies/movies.component";
import {TvseriesComponent} from "./tvseries/tvseries.component";
import {AuthorComponent} from "./author/author.component";
import {MoviesEditComponent} from "./movies/movies-edit/movies-edit.component";
import {MovieFromImdbResolver} from "./movies/movies-edit/movie-from-imdb-resolver.service";
import {MovieFromDbResolver} from "./movies/movies-edit/movie-from-db.resolver.service";
import {MoviesListComponent} from "./movies/movies-list/movies-list.component";
import {MoviesFromDbResolver} from "./movies/movies-list/movies-from-db-resolver.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "start",
    component: StartComponent
  },
  {
    path: "movies",
    component: MoviesComponent,
    resolve: {
      movies: MoviesFromDbResolver
    }
  },
  {
    path: "movies/edit/:movie.id",
    component: MoviesEditComponent,
    resolve: {
      movie_imdb: MovieFromImdbResolver,
      movie_db: MovieFromDbResolver
    }
  },
  {
    path: "tvseries",
    component: TvseriesComponent
  },
  {
    path: "author",
    component: AuthorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
