import { Component, OnInit } from '@angular/core';
import { Tvseries } from "../tvseries.model";
import { ActivatedRoute, Router } from "@angular/router";
import { TvseriesService } from "../../services/tvseries.service";

@Component({
  selector: 'app-tvseries-list',
  templateUrl: './tvseries-list.component.html',
  styleUrls: ['./tvseries-list.component.css']
})
export class TvseriesListComponent implements OnInit {

  tvseries: Tvseries[] = null;

  constructor(private tvseriesService: TvseriesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.tvseries = this.route.snapshot.data.tvseries;

    this.tvseriesService.eventTvseriesAdded.subscribe(
      (tvseries: Tvseries) => this.tvseries.push(tvseries)
    );
  }

}
