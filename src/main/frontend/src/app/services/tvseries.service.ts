import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Tvseries } from "../tvseries/tvseries.model";
import { Tvseason } from "../tvseries/tvseason.model";
import { Tvepisode } from "../tvseries/tvepisode.model";

@Injectable({
  providedIn: 'root'
})
export class TvseriesService {

  url: string = 'api/tvseries';

  imdb_api_url: string = 'https://api.themoviedb.org/3/';
  imdb_api_key: string = '&api_key=cfe422613b250f702980a3bbf9e90716';

  eventTvseriesAdded = new EventEmitter<Tvseries>();
  eventTvseasonAdded = new EventEmitter<Tvseason>();
  eventTvepisodeAdded = new EventEmitter<Tvepisode>();

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

  searchTvseriesInImdb(tvseries_title): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.imdb_api_url}search/tv?query=${tvseries_title}${this.imdb_api_key}`);
  }

  getTvseriesFromImdb(imdb_id): Observable<any> {
    return this.http.get<Array<any>>(`${this.imdb_api_url}tv/${imdb_id}?${this.imdb_api_key}`);
  }

  getTvepisodeFromImdb(tvseries_imdb_id, tvseason_imdb_number): Observable<any> {
    return this.http.get<any>(`${this.imdb_api_url}tv/${tvseries_imdb_id}/season/${tvseason_imdb_number}?${this.imdb_api_key}`);
  }

}
