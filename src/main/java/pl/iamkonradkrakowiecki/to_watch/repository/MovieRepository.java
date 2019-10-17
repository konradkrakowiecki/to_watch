package pl.iamkonradkrakowiecki.to_watch.repository;

import org.springframework.data.repository.CrudRepository;
import pl.iamkonradkrakowiecki.to_watch.domain.Movie;

public interface MovieRepository extends CrudRepository<Movie, Long> {
}
