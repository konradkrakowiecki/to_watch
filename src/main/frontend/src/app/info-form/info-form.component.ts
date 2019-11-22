import {Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { MoviesService } from "../services/movies.service";
import { TvseriesService } from "../services/tvseries.service";

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.css']
})
export class InfoFormComponent implements OnInit {

  @Input()
  input_data;

  @Input()
  input_all;

  watchForm: FormGroup;

  constructor(private moviesService: MoviesService, private  tvseriesService: TvseriesService) {}


  ngOnInit() {
    const { to_watch, when_watched, where_watched, note, rating } = this.input_data;
    this.watchForm = new FormGroup({
      to_watch: new FormControl(to_watch),
      when_watched: new FormControl(when_watched, this.dateValidator),
      where_watched: new FormControl(where_watched, Validators.maxLength(100)),
      note: new FormControl(note, Validators.maxLength(200)),
      rating: new FormControl(rating),
    });
  }

  dateValidator(control: AbstractControl): ValidationErrors {
    const currentDate: Date = new Date();
    const formDate: Date = new Date(control.value);

    if (currentDate < formDate) {
      return { 'future_date': true }
    }
  }

  onSubmit() {
    const { to_watch, when_watched, where_watched, note, rating } = this.watchForm.value;
    this.input_data.to_watch = to_watch;
    this.input_data.when_watched = when_watched;
    this.input_data.where_watched = where_watched;
    this.input_data.note = note;
    this.input_data.rating = rating;

    if (this.input_data.type === "movie") {
      this.moviesService.addMovie(this.input_data).subscribe();
    } else if (this.input_data.type === "tvseries") {
      this.tvseriesService.addTvseries(this.input_data).subscribe();
      this.input_data.seasons.forEach(season => {
        season.to_watch = to_watch;
        season.when_watched = when_watched;
        this.tvseriesService.addTvseason(this.input_data.id, season).subscribe();
        season.episodes.forEach(episode => {
          episode.to_watch = to_watch;
          episode.when_watched = when_watched;
          this.tvseriesService.addTvepisode(season.id, episode).subscribe();
        });
      });
    } else if (this.input_data.type === "tvseason") {
      this.input_data.to_watch = to_watch;
      this.input_data.when_watched = when_watched;
      this.input_data.where_watched = where_watched;
      this.input_data.note = note;
      this.input_data.rating = rating;

      this.tvseriesService.addTvseason(this.input_all[0].id, this.input_data).subscribe();
      this.input_data.episodes.forEach(episode => {
        episode.to_watch = to_watch;
        episode.when_watched = when_watched;
        this.tvseriesService.addTvepisode(this.input_data.id, episode).subscribe();
      });
      this.onSeasonsStatusChanege(this.input_all[0]);

    } else if (this.input_data.type === "tvepisode") {
      this.input_data.to_watch = to_watch;
      this.input_data.when_watched = when_watched;
      this.input_data.where_watched = where_watched;
      this.input_data.note = note;
      this.input_data.rating = rating;

      this.tvseriesService.addTvepisode(this.input_all[1].id, this.input_data).subscribe();

      if (this.input_all[1].episodes.every(episode => episode.to_watch) === true) {
        this.input_all[1].to_watch = true;
        this.tvseriesService.addTvseason(this.input_all[0].id, this.input_all[1]).subscribe();
      } else {
        this.input_all[1].to_watch = false;
        this.tvseriesService.addTvseason(this.input_all[0].id, this.input_all[1]).subscribe();
      }
      this.onSeasonsStatusChanege(this.input_all[0]);
    }
  }

  onSeasonsStatusChanege(series) {
    if (series.seasons.every(season => season.to_watch) === true) {
      series.to_watch = true;
      this.tvseriesService.addTvseries(series).subscribe();
    } else {
      series.to_watch = false;
      this.tvseriesService.addTvseries(series).subscribe();
    }
  }

}
