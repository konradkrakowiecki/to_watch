import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { MoviesService } from "../../services/movies.service";
import { Movie } from "../movie.model";

@Injectable({
  providedIn: 'root',
})
export class MoviesFromDbResolver implements Resolve<Array<Movie>> {

  constructor(private moviesService: MoviesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Movie>> {
    const movies = this.moviesService.getMovies();
    movies.subscribe(
      movie => movie,
      error => console.log(error)
    )
    return movies;
  }
}
