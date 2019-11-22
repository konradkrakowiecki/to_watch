import { Component, OnInit } from '@angular/core';
import { TvseriesService } from "../../services/tvseries.service";

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
    this.tvseries_title = "";
    this.tvseriesService.addNewTvseries(tvseries_imdb_id);
  }

  searchTvseries(e) {
    this.validationTitle();
    const length: number = this.tvseries_title.length;
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
    const length: number = this.tvseries_title.length;
    if (length < 1) this.error_search = "Please, enter at least one character.";
    else if (length >= 1 && length <= 2) {
      this.error_search = "Please, enter a minimum of three characters to automatically search, or press Enter key.";
    } else if (length > 2) {
      this.error_search = "";
    }
  }

}
