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
  sort_by: string = "sortByTitle";

  constructor(private tvseriesService: TvseriesService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tvseries = this.route.snapshot.data.tvseries;

    this.tvseriesService.eventTvseriesAdded.subscribe(
      (tvseries: Tvseries) => { this.tvseries.push(tvseries); this.tvseries = this.tvseries.slice() }
    );
  }

  showTvseries(tvseries: Tvseries) {
    this.router.navigate(['tvseries/info/', tvseries.id]);
  }

  deleteTvseries(tvseries: Tvseries) {
    this.router.navigate(['tvseries/delete/', tvseries.id]);
  }

  update() {
    this.tvseries.forEach(series => {
      // @ts-ignore
      series.seasons.sort((a, b) => (a.season_number > b.season_number) ? 1 : -1);
      const last_update: Date = this.tvseriesService.getDateFromString(series.last_update);

      this.tvseriesService.getTvseriesFromImdb(series.imdb_id).subscribe(
        series_imdb => {
          const last_air_date: Date = this.tvseriesService.getDateFromString(series_imdb.last_air_date);
          if (last_update < last_air_date) {
            // @ts-ignore
            if (series_imdb.seasons.length > series.seasons.length) {
              // @ts-ignore
              const last_season_number: number = series.seasons[series.seasons.length - 1].season_number;
              series_imdb.seasons.forEach(season => {
                if (season.season_number > last_season_number) {
                  this.tvseriesService.addNewTvseason(season, series.imdb_id, series.id);
                }
              });
            }
            series_imdb.seasons.forEach((season_imdb, index) => {
              // @ts-ignore
              if (series.seasons[index] != undefined) {
                // @ts-ignore
                if (season_imdb.episode_count > series.seasons[index].episodes.length) {
                  let episodes = null;
                  this.tvseriesService.getTvepisodeFromImdb(series_imdb.id, season_imdb.season_number).subscribe(
                    data => {
                      episodes = data.episodes;
                      // @ts-ignore
                      const last: number = series.seasons[index].episodes.length;
                      for (let i = last; i <= season_imdb.episode_count - 1; i++) {
                        // @ts-ignore
                        this.tvseriesService.addNewTvepisode(series.seasons[index].id, episodes[i]);
                      }
                    },
                    error => console.log(error),
                  );
                }
              }
            });
          }
        },
        error => console.log(error)
      );
    series.last_update = this.tvseriesService.getDateAsString();
    this.tvseriesService.addTvseries(series).subscribe();
    });
  }

}
