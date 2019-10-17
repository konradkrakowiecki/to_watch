package pl.iamkonradkrakowiecki.to_watch.service;

import org.springframework.stereotype.Service;
import pl.iamkonradkrakowiecki.to_watch.domain.Movie;
import pl.iamkonradkrakowiecki.to_watch.repository.MovieRepository;

import java.util.Optional;

@Service
public class MovieServiceImpl implements MovieService {

    private MovieRepository movieRepository;

    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    public Iterable<Movie> list_all_movies() {
        return this.movieRepository.findAll();
    }

    @Override
    public Optional<Movie> find_movie_by_id(Long id) {
        return this.movieRepository.findById(id);
    }

    @Override
    public Movie save_movie(Movie movie) {
        return this.movieRepository.save(movie);
    }

    @Override
    public void delete_movie(Long id) {
        this.movieRepository.deleteById(id);
    }
}
