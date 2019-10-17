package pl.iamkonradkrakowiecki.to_watch.service;

import pl.iamkonradkrakowiecki.to_watch.domain.Movie;

import java.util.Optional;

public interface MovieService {

    Iterable<Movie> list_all_movies();

    Optional<Movie> find_movie_by_id(Long id);

    Movie save_movie(Movie movie);

    void delete_movie(Long id);
}
