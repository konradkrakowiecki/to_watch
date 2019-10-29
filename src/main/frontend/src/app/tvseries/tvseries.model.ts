export class Tvseries {
  public id: number;
  public imdb_id: number;
  public title: string;
  public release_date: string;
  public number_of_episodes: number;
  public number_of_seasons: number;
  public to_watch: boolean;
  public when_watched: string;
  public where_watched: string;
  public note: string;
  public rating: number;

  constructor(imdb_id: number,
              title: string,
              release_date: string,
              number_of_episodes: number,
              number_of_seasons: number,
              to_watch: boolean,
              when_watched: string,
              where_watched: string,
              note: string,
              rating: number) {
    this.imdb_id = imdb_id;
    this.title = title;
    this.release_date = release_date;
    this.number_of_episodes = number_of_episodes;
    this.number_of_seasons = number_of_seasons;
    this.to_watch = to_watch;
    this.when_watched = when_watched;
    this.where_watched = where_watched;
    this.note = note;
    this.rating = rating;
  }
}
