import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Observable } from "rxjs";
import { Tvseries } from "../tvseries.model";
import { TvseriesService } from "../../services/tvseries.service";

@Injectable({
  providedIn: 'root',
})
export class TvseriesFromDbResolver implements Resolve<Array<Tvseries>> {

  constructor(private tvseries: TvseriesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Tvseries>> {
    const tvseries = this.tvseries.getTvseries();
    tvseries.subscribe(
      tvseries => tvseries,
      error => console.log(error)
    )
    return tvseries;
  }
}
