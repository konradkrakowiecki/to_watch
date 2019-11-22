import { Component, OnInit } from '@angular/core';
import {Tvseries} from "../tvseries.model";
import {Observable, Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {TvseriesService} from "../../services/tvseries.service";

@Component({
  selector: 'app-tvseries-delete',
  templateUrl: './tvseries-delete.component.html',
  styleUrls: ['./tvseries-delete.component.css']
})
export class TvseriesDeleteComponent implements OnInit {

  tvseries: Tvseries = null;

  constructor(private tvseriesService: TvseriesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.tvseries = this.route.snapshot.data.tvseries;
  }

  back() {
    this.router.navigate(['tvseries']);
  }

  deleteTvseries() {
    this.deleteEpisodes(this.tvseries).subscribe();
    this.deleteSeasons(this.tvseries).subscribe();
    this.tvseriesService.deleteTvseries(this.tvseries).subscribe();
    this.router.navigate(['tvseries']);
  }

  deleteEpisodes(tvseries: Tvseries): Observable<Tvseries> {
    let series = new Subject<Tvseries>();
    // @ts-ignore
    series.next(tvseries.seasons.forEach(season => {
        season.episodes.forEach(episode => {
          this.tvseriesService.deleteTvepisode(episode).subscribe();
        });
      })
    );
    return series.asObservable();
  }

  deleteSeasons(tvseries: Tvseries): Observable<Tvseries> {
    let series = new Subject<Tvseries>();
    // @ts-ignore
    series.next(tvseries.seasons.forEach(season => {
        this.tvseriesService.deleteTvseason(season).subscribe();
      })
    );
    return series.asObservable();
  }

}
