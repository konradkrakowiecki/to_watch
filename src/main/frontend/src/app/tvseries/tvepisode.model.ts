export class Tvepisode {
  public id: number;
  public imdb_id: number;
  public episode_number: number;
  public name: string;
  public release_date: string;
  public to_watch: boolean;
  public when_watched: string;
  public where_watched: string;
  public note: string;
  public rating: number;

  constructor(imdb_id: number,
              episode_number: number,
              name: string,
              release_date: string,
              to_watch: boolean,
              when_watched: string,
              where_watched: string,
              note: string,
              rating: number) {
    this.imdb_id = imdb_id;
    this.episode_number = episode_number;
    this.name = name;
    this.release_date = release_date;
    this.to_watch = to_watch;
    this.when_watched = when_watched;
    this.where_watched = where_watched;
    this.note = note;
    this.rating = rating;
  }
}
