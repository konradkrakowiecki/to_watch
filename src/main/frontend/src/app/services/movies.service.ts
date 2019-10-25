import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie } from "../movies/movie.model";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  url: string = 'api/movies';

  imdb_api_url: string = 'https://api.themoviedb.org/3';
  imdb_api_key: string = '&api_key=cfe422613b250f702980a3bbf9e90716';

  eventMovieAdded = new EventEmitter<Movie>();

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(this.url);
  }

  getMovie(id): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/${id}`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.url}/save`, movie);
  }

  deleteMovie(movie: Movie): Observable<Movie> {
    return this.http.delete<Movie>(`api/movies/${movie.id}/delete`);
  }

  searchMovieInImdb(movie_title): Observable<Array<any>> {
    return this.http.get<Array<Movie>>(`${this.imdb_api_url}/search/movie?query=${movie_title}${this.imdb_api_key}`);
  }

  getMovieFromImdb(imdb_id): Observable<any> {
    return this.http.get<Array<Movie>>(`${this.imdb_api_url}/movie/${imdb_id}?${this.imdb_api_key}`);
  }
}
