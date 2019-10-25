import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { MoviesService } from "../../services/movies.service";
import { mergeMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class MovieFromImdbResolver implements Resolve<object> {

  constructor(private moviesService: MoviesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
    let movie_id = +route.params['movie.id'];
    const movie = this.moviesService.getMovie(movie_id).pipe(
      mergeMap(movie => this.moviesService.getMovieFromImdb(movie.imdb_id))
    );
    movie.subscribe(
      movie => movie,
      error => console.log(error)
    )
    return movie;
  }
}
