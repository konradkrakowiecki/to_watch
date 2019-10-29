import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MoviesService} from "../services/movies.service";

@Component({
  selector: 'app-watch-form',
  templateUrl: './watch-form.component.html',
  styleUrls: ['./watch-form.component.css']
})
export class WatchFormComponent implements OnInit {

  @Input()
  inputData;

  watchForm: FormGroup;

  constructor(private moviesService: MoviesService) {}


  ngOnInit() {
    const { to_watch, when_watched, where_watched, note, rating } = this.inputData;
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
    this.inputData.to_watch = to_watch;
    this.inputData.when_watched = when_watched;
    this.inputData.where_watched = where_watched;
    this.inputData.note = note;
    this.inputData.rating = rating;
    this.moviesService.addMovie(this.inputData).subscribe();
  }

}
