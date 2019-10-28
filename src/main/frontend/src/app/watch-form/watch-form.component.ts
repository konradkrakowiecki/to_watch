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
    this.watchForm = new FormGroup({
      to_watch: new FormControl(this.inputData.to_watch),
      when_watched: new FormControl(this.inputData.when_watched, this.dateValidator),
      where_watched: new FormControl(this.inputData.where_watched, Validators.maxLength(100)),
      note: new FormControl(this.inputData.note, Validators.maxLength(200)),
      rating: new FormControl(this.inputData.rating),
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
    this.inputData.to_watch = this.watchForm.value.to_watch;
    this.inputData.when_watched = this.watchForm.value.when_watched;
    this.inputData.where_watched = this.watchForm.value.where_watched;
    this.inputData.note = this.watchForm.value.note;
    this.inputData.rating = this.watchForm.value.rating;
    this.moviesService.addMovie(this.inputData).subscribe();
  }

}
