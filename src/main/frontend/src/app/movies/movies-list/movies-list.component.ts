import { Component, OnInit } from '@angular/core';
import { MoviesService } from "../../services/movies.service";
import { Movie } from "../movie.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  movies: Movie[] = null;
  sort_by: string = "sortByTitle";

  constructor(private moviesService: MoviesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.movies = this.route.snapshot.data.movies;

    this.moviesService.eventMovieAdded.subscribe(
      (movie: Movie) => { this.movies.push(movie); this.movies = this.movies.slice() }
    );
  }

  showMovie(movie: Movie) {
    this.router.navigate(['movies/info/', movie.id]);
  }

  setMovieIsWatched(movie: Movie) {
    movie.to_watch = true;
    this.moviesService.addMovie(movie).subscribe(
      () => this.movies = this.movies.slice()
    );
  }

  deleteMovie(movie: Movie) {
    this.router.navigate(['movies/delete/', movie.id]);
  }

}
