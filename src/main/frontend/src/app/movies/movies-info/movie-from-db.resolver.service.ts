import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { MoviesService } from "../../services/movies.service";
import { Movie } from "../movie.model";

@Injectable({
  providedIn: 'root',
})
export class MovieFromDbResolver implements Resolve<Movie> {

  constructor(private moviesService: MoviesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movie> {
    let movie_id = +route.params['movie.id'];
    const movie = this.moviesService.getMovie(movie_id);
    movie.subscribe(
      movie => movie,
      error => console.log(error)
    )
    return movie;
  }
}
