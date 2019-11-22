export class Movie {
  public id: number;
  public type: string;
  public imdb_id: number;
  public title: string;
  public release_date: string;
  public to_watch: boolean;
  public when_watched: string;
  public where_watched: string;
  public note: string;
  public rating: number;

  constructor(type: string,
              imdb_id: number,
              title: string,
              release_date: string,
              to_watch: boolean,
              when_watched: string,
              where_watched: string,
              note: string,
              rating: number) {
    this.type = type;
    this.imdb_id = imdb_id;
    this.title = title;
    this.release_date = release_date;
    this.to_watch = to_watch;
    this.when_watched = when_watched;
    this.where_watched = where_watched;
    this.note = note;
    this.rating = rating;
  }
}
