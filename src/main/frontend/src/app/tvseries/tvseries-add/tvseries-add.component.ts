import { Component, OnInit } from '@angular/core';
import { TvseriesService } from "../../services/tvseries.service";
import { Tvseries } from "../tvseries.model";
import { Tvseason } from "../tvseason.model";
import { Tvepisode } from "../tvepisode.model";

@Component({
  selector: 'app-tvseries-add',
  templateUrl: './tvseries-add.component.html',
  styleUrls: ['./tvseries-add.component.css']
})
export class TvseriesAddComponent implements OnInit {

  tvseries_title: string = "";
  error_search: string = "";
  search_tvseries: any = [];

  constructor(private tvseriesService: TvseriesService) { }

  ngOnInit() {
  }

  addTvseries(tvseries_imdb_id) {
    this.search_tvseries = [];

    this.tvseriesService.getTvseriesFromImdb(tvseries_imdb_id).subscribe(
      series => {
        const { id, original_name, first_air_date, number_of_episodes, number_of_seasons } = series;
        const tvseries: Tvseries = new Tvseries(
          id,
          original_name,
          first_air_date,
          number_of_episodes,
          number_of_seasons,
          false,
          null,
          null,
          null,
          null,
        );

        this.tvseriesService.addTvseries(tvseries).subscribe(
          (newTvseries: Tvseries) => {
            this.tvseries_title = "";
            series.seasons.forEach(season => this.addTvseason(season, series.id, newTvseries.id));
          },
          error => console.log(error),
        );
      },
      error => console.log(error)
    );
  }

  addTvseason(season, tvseries_imdb_id, tvseries_db_id) {
    const {id, season_number, name, air_date, episode_count} = season;
    const tvseason: Tvseason = new Tvseason(
      id,
      season_number,
      name,
      air_date,
      episode_count,
      false,
      null,
      null,
      null,
      null,
    );
    this.tvseriesService.addTvseason(tvseries_db_id, tvseason).subscribe(
      (newTvseason: Tvseason) => {
        this.tvseriesService.getTvepisodeFromImdb(tvseries_imdb_id, newTvseason.season_number).subscribe(
          data => data.episodes.forEach( episode => this.addTvepisode(newTvseason.id, episode)),
          error => console.log(error),
        );
      }
    );
  }

  addTvepisode(tvseason_db_id, episode) {
    const { id, episode_number, name, air_date } = episode;
    const tvepisode: Tvepisode = new Tvepisode(
      id,
      episode_number,
      name,
      air_date,
      false,
      null,
      null,
      null,
      null,
    );
    this.tvseriesService.addTvepisode(tvseason_db_id, tvepisode).subscribe(
      (newTvepisode: Tvepisode) => {},
      error => console.log(error)
    );
  }

  searchTvseries(e) {
    this.validationTitle();
    const length = this.tvseries_title.length;
    if ((length >= 1 && length <= 2) && (e.type === "click" || e.keyCode === 13)) {
      this.autoSearchTvseries();
    } else if (length > 2) {
      this.autoSearchTvseries();
    }
  }

  autoSearchTvseries() {
    this.tvseriesService.searchTvseriesInImdb(this.tvseries_title).subscribe(
      (tvseries: any) => {
        if (tvseries.results.length === 0) this.error_search = "No TV series in the database.";
        this.search_tvseries = tvseries.results.slice(0, 5);
      }
    );
  }

  validationTitle() {
    const length = this.tvseries_title.length;
    if (length < 1) this.error_search = "Please, enter at least one character.";
    else if (length >= 1 && length <= 2) {
      this.error_search = "Please, enter a minimum of three characters to automatically search, or press Enter key.";
    } else if (length > 2) {
      this.error_search = "";
    }
  }

}
