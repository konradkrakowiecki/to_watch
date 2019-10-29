import {Component, EventEmitter, OnInit} from '@angular/core';
import { Movie } from "../movie.model";
import { MoviesService } from "../../services/movies.service";
import {collectExternalReferences} from "@angular/compiler";

@Component({
  selector: 'app-movies-add',
  templateUrl: './movies-add.component.html',
  styleUrls: ['./movies-add.component.css']
})
export class MoviesAddComponent implements OnInit {

  movie_title: string = "";
  error_search: string = "";
  search_movies: any = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
  }

  addMovie(imdb_id) {
    this.search_movies = [];

    this.moviesService.getMovieFromImdb(imdb_id).subscribe(
      (movieFromImdb: any) => {
        const { id, original_title, release_date } = movieFromImdb;
        const movie: Movie = new Movie(
          id,
          original_title,
          release_date,
          false,
          null,
          null,
          null,
          null,
        );

        this.moviesService.addMovie(movie).subscribe(
          (newMovie: Movie) => {
            this.movie_title = "";
            this.moviesService.eventMovieAdded.emit(newMovie);
          },
          error => console.log(error)
        );
      },
        error => console.log(error)
    );
  }

  searchMovie(e) {
    this.validationTitle();
    const length = this.movie_title.length;
    if ((length >= 1 && length <= 2) && (e.type === "click" || e.keyCode === 13)) {
      this.autoSearchMovie();
    } else if (length > 2) {
      this.autoSearchMovie();
    }
  }

  autoSearchMovie() {
    this.moviesService.searchMovieInImdb(this.movie_title).subscribe(
      (movies: any) => {
        if (movies.results.length === 0) this.error_search = "No movie in the database.";
        this.search_movies = movies.results.slice(0, 5);
      }
    );
  }

  validationTitle() {
    const length = this.movie_title.length;
    if (length < 1) this.error_search = "Please, enter at least one character.";
    else if (length >= 1 && length <= 2) {
      this.error_search = "Please, enter a minimum of three characters to automatically search, or press Enter key.";
    } else if (length > 2) {
      this.error_search = "";
    }
  }

}
