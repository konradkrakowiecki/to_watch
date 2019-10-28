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

  constructor(private moviesService: MoviesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.movies = this.route.snapshot.data.movies;

    this.moviesService.eventMovieAdded.subscribe(
      (movie: Movie) => this.movies.push(movie)
    );
  }

  showMovie(movie: Movie) {
    this.router.navigate(['movies/info/', movie.id]);
  }

  setMovieIsWatched(movie: Movie) {
    movie.to_watch = true;
    this.moviesService.addMovie(movie).subscribe();
  }

  deleteMovie(movie: Movie) {
    const movieToDelete = movie;
    this.moviesService.deleteMovie(movie).subscribe(
      () => this.movies = this.movies.filter( m => m.id !== movieToDelete.id));
  }

}
