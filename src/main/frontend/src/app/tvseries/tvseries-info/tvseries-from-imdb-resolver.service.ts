import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import {TvseriesService} from "../../services/tvseries.service";

@Injectable({
  providedIn: 'root',
})
export class TvseriesFromImdbResolver implements Resolve<object> {

  constructor(private tvseriesService: TvseriesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
    let tvseries_id = +route.params['tvseries.id'];
    const tvseries = this.tvseriesService.getTvseriesById(tvseries_id).pipe(
      mergeMap(tvseries => this.tvseriesService.getTvseriesFromImdb(tvseries.imdb_id))
    );
    tvseries.subscribe(
      tvseries => tvseries,
      error => console.log(error)
    )
    return tvseries;
  }
}
