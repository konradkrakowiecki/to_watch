package pl.iamkonradkrakowiecki.to_watch.repository;

import org.springframework.data.repository.CrudRepository;
import pl.iamkonradkrakowiecki.to_watch.domain.TvSeason;

public interface TvSeasonRepository extends CrudRepository<TvSeason, Long> {
}
