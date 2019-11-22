import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Tvseries } from "../tvseries.model";

@Component({
  selector: 'app-tvseries-info',
  templateUrl: './tvseries-info.component.html',
  styleUrls: ['./tvseries-info.component.css']
})
export class TvseriesInfoComponent implements OnInit {

  tvseries_imdb: any = null;
  tvseries_db: Tvseries = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.tvseries_imdb = this.route.snapshot.data.tvseries_imdb;
    this.tvseries_db = this.route.snapshot.data.tvseries_db;
  }

}
