import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { Tvseries } from "../tvseries.model";
import { TvseriesService } from "../../services/tvseries.service";

@Injectable({
  providedIn: 'root',
})
export class SeriesFromDbResolver implements Resolve<Tvseries> {

  constructor(private tvseriesService: TvseriesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tvseries> {
    let tvseries_id = +route.params['tvseries.id'];
    const tvseries = this.tvseriesService.getTvseriesById(tvseries_id);
    tvseries.subscribe(
      tvseries => tvseries,
      error => console.log(error)
    )
    return tvseries;
  }
}
