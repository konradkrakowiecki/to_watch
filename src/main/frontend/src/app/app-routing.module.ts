import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from "./start/start.component";
import { MoviesComponent } from "./movies/movies.component";
import { TvseriesComponent } from "./tvseries/tvseries.component";
import { AuthorComponent } from "./author/author.component";
import { MoviesInfoComponent } from "./movies/movies-info/movies-info.component";
import { MovieFromImdbResolver } from "./movies/movies-info/movie-from-imdb-resolver.service";
import { MovieFromDbResolver } from "./movies/movies-info/movie-from-db.resolver.service";
import { MoviesFromDbResolver } from "./movies/movies-list/movies-from-db-resolver.service";
import { TvseriesFromDbResolver } from "./tvseries/tvseries-list/tvseries-from-db-resolver.service";
import { TvseriesInfoComponent } from "./tvseries/tvseries-info/tvseries-info.component";
import { TvseriesFromImdbResolver } from "./tvseries/tvseries-info/tvseries-from-imdb-resolver.service";
import { SeriesFromDbResolver } from "./tvseries/tvseries-info/series-from-db.resolver.service";
import {TvseriesDeleteComponent} from "./tvseries/tvseries-delete/tvseries-delete.component";
import {MoviesDeleteComponent} from "./movies/movies-delete/movies-delete.component";

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
    path: "movies/info/:movie.id",
    component: MoviesInfoComponent,
    resolve: {
      movie_imdb: MovieFromImdbResolver,
      movie_db: MovieFromDbResolver
    }
  },
  {
    path: "movies/delete/:movie.id",
    component: MoviesDeleteComponent,
    resolve: {
      movie: MovieFromDbResolver
    }
  },
  {
    path: "tvseries",
    component: TvseriesComponent,
    resolve: {
      tvseries: TvseriesFromDbResolver
    }
  },
  {
    path: "tvseries/info/:tvseries.id",
    component: TvseriesInfoComponent,
    resolve: {
      tvseries_imdb: TvseriesFromImdbResolver,
      tvseries_db: SeriesFromDbResolver
    }
  },
  {
    path: "tvseries/delete/:tvseries.id",
    component: TvseriesDeleteComponent,
    resolve: {
      tvseries: SeriesFromDbResolver
    }
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
