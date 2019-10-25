import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-movies-edit',
  templateUrl: './movies-edit.component.html',
  styleUrls: ['./movies-edit.component.css']
})
export class MoviesEditComponent implements OnInit {

  movie_imdb: any = null;
  movie_db: any = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.movie_imdb = this.route.snapshot.data.movie_imdb;
    this.movie_db = this.route.snapshot.data.movie_db;
  }
}
