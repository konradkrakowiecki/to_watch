import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tvseries } from "../tvseries/tvseries.model";
import { Tvseason } from "../tvseries/tvseason.model";
import { Tvepisode } from "../tvseries/tvepisode.model";
import {Movie} from "../movies/movie.model";

@Injectable({
  providedIn: 'root'
})
export class TvseriesService {

  url: string = 'api/tvseries';

  episode_total_numbers: number = 0;
  tvseries_to_emit: Tvseries = null;

  imdb_api_url: string = 'https://api.themoviedb.org/3/';
  imdb_api_key: string = '&api_key=cfe422613b250f702980a3bbf9e90716';

  eventTvseriesAdded = new EventEmitter<Tvseries>();

  constructor(private http: HttpClient) { }

  getTvseries(): Observable<Array<Tvseries>> {
    return this.http.get<Array<Tvseries>>(this.url);
  }

  getTvseriesById(id): Observable<Tvseries> {
    return this.http.get<Tvseries>(`${this.url}/${id}`);
  }

  addTvseries(tvseries: Tvseries): Observable<Tvseries> {
    return this.http.post<Tvseries>(`${this.url}/save`, tvseries);
  }

  addTvseason(tvseries_id, tvseason: Tvseason): Observable<Tvseason> {
    return this.http.post<Tvseason>(`${this.url}/${tvseries_id}/saveseason`, tvseason);
  }

  addTvepisode(tvseason_id, tvepisode: Tvepisode): Observable<Tvepisode> {
    return this.http.post<Tvepisode>(`api/tvseason/${tvseason_id}/saveepisode`, tvepisode);
  }

  deleteTvseries(tvseries: Tvseries): Observable<Tvseries> {
    return this.http.delete<Tvseries>(`${this.url}/${tvseries.id}/delete`);
  }

  deleteTvseason(tvseason: Tvseason): Observable<Tvseason> {
    return this.http.delete<Tvseason>(`api/tvseason/${tvseason.id}/delete`);
  }

  deleteTvepisode(tvepisode: Tvepisode): Observable<Tvepisode> {
    return this.http.delete<Tvepisode>(`api/tvepisode/${tvepisode.id}/delete`);
  }

  searchTvseriesInImdb(tvseries_title): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.imdb_api_url}search/tv?query=${tvseries_title}${this.imdb_api_key}`);
  }

  getTvseriesFromImdb(imdb_id): Observable<any> {
    return this.http.get<Array<any>>(`${this.imdb_api_url}tv/${imdb_id}?${this.imdb_api_key}`);
  }

  getTvepisodeFromImdb(tvseries_imdb_id, tvseason_imdb_number): Observable<any> {
    return this.http.get<any>(`${this.imdb_api_url}tv/${tvseries_imdb_id}/season/${tvseason_imdb_number}?${this.imdb_api_key}`);
  }

  //***

  addNewTvseries(tvseries_imdb_id) {
    this.getTvseriesFromImdb(tvseries_imdb_id).subscribe(
      series => {
        const { id, original_name, first_air_date } = series;
        const tvseries: Tvseries = new Tvseries(
          "tvseries",
          id,
          original_name,
          first_air_date,
          this.getDateAsString(),
          false,
          null,
          null,
          null,
          null,
        );

        this.episode_total_numbers = this.getEpisodesTotalNumbers(series.number_of_episodes, series.number_of_seasons, series.seasons.length, series.seasons[0].episode_count);

        this.addTvseries(tvseries).subscribe(
          (newTvseries: Tvseries) => {
            this.tvseries_to_emit = newTvseries;
            series.seasons.forEach(season => this.addNewTvseason(season, series.id, newTvseries.id));
          },
          error => console.log(error),
        );
      },
      error => console.log(error)
    );
  }

  addNewTvseason(season, tvseries_imdb_id, tvseries_db_id) {
    const {id, season_number, name, air_date} = season;
    const tvseason: Tvseason = new Tvseason(
      "tvseason",
      id,
      season_number,
      name,
      air_date,
      false,
      null,
      null,
      null,
      null,
    );
    this.addTvseason(tvseries_db_id, tvseason).subscribe(
      (newTvseason: Tvseason) => {
        this.getTvepisodeFromImdb(tvseries_imdb_id, newTvseason.season_number).subscribe(
          data => data.episodes.forEach(episode => this.addNewTvepisode(newTvseason.id, episode)),
          error => console.log(error),
        );
      }
    );
  }

  addNewTvepisode(tvseason_db_id, episode) {
    const { id, episode_number, name, air_date } = episode;
    const tvepisode: Tvepisode = new Tvepisode(
      "tvepisode",
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
    this.addTvepisode(tvseason_db_id, tvepisode).subscribe(
      (newTvepisode: Tvepisode) => {
        this.episode_total_numbers--;
        if (this.episode_total_numbers === 0) {
          this.eventTvseriesAdded.emit(this.tvseries_to_emit);
        }
      },
      error => console.log(error)
    );
  }

  getEpisodesTotalNumbers(episodes_numbers, seasons_numbers, all_seasons_numbers, specials) {
    let episodes_total_numbers: number = 0;
    if (seasons_numbers < all_seasons_numbers) {
      episodes_total_numbers = episodes_numbers + specials;
    } else {
      episodes_total_numbers = episodes_numbers;
    }
    return episodes_total_numbers;
  }

  getDateAsString(): string {
    const date: Date = new Date();
    let day_of_month: string = "";
    if (date.getDate() <= 9) {
      day_of_month = "0" + date.getDate();
    } else {
      day_of_month = "" + date.getDate();
    }
    return `${date.getFullYear()}-${date.getMonth()+1}-${day_of_month}`;
  }

  getDateFromString(date_string: String): Date {
    const [year, month, day] = date_string.split("-");
    const date: Date = new Date(+year, +month - 1, +day);
    return date;
  }

}
