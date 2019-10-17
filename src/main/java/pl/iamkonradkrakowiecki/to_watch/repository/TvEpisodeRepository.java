package pl.iamkonradkrakowiecki.to_watch.repository;

import org.springframework.data.repository.CrudRepository;
import pl.iamkonradkrakowiecki.to_watch.domain.TvEpisode;

public interface TvEpisodeRepository extends CrudRepository<TvEpisode, Long> {
}
