import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-movies-info',
  templateUrl: './movies-info.component.html',
  styleUrls: ['./movies-info.component.css']
})
export class MoviesInfoComponent implements OnInit {

  movie_imdb: any = null;
  movie_db: any = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.movie_imdb = this.route.snapshot.data.movie_imdb;
    this.movie_db = this.route.snapshot.data.movie_db;
  }
}
