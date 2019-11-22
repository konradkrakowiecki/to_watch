import { Component, OnInit } from '@angular/core';
import {Movie} from "../movie.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MoviesService} from "../../services/movies.service";

@Component({
  selector: 'app-movies-delete',
  templateUrl: './movies-delete.component.html',
  styleUrls: ['./movies-delete.component.css']
})
export class MoviesDeleteComponent implements OnInit {

  movie: Movie = null;

  constructor(private moviesService: MoviesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.movie = this.route.snapshot.data.movie;
  }

  back() {
    this.router.navigate(['movies']);
  }

  deleteMovie() {
    this.moviesService.deleteMovie(this.movie).subscribe();
    this.router.navigate(['movies']);
  }

}
