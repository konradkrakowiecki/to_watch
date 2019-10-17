package pl.iamkonradkrakowiecki.to_watch.controller;

import org.springframework.web.bind.annotation.*;
import pl.iamkonradkrakowiecki.to_watch.domain.Movie;
import pl.iamkonradkrakowiecki.to_watch.service.MovieService;

import java.util.Optional;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping(value = {"", "/"})
    public Iterable<Movie> listMovies() {
        return this.movieService.list_all_movies();
    }

    @GetMapping(value = {"/{id}", "/{id}/"})
    public Optional<Movie> findMoviesById(@PathVariable Long id) {
        return this.movieService.find_movie_by_id(id);
    }

    @PostMapping("/save")
    public Movie saveMovie(@RequestBody Movie movie) {
        return this.movieService.save_movie(movie);
    }

    @DeleteMapping(value = {"/{id}/delete", "/{id}/delete"})
    public void delete(@PathVariable Long id) {
        this.movieService.delete_movie(id);
    }

}
