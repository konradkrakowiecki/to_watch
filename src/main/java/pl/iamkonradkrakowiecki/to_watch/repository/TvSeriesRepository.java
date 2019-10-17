package pl.iamkonradkrakowiecki.to_watch.repository;

import org.springframework.data.repository.CrudRepository;
import pl.iamkonradkrakowiecki.to_watch.domain.TvSeries;

public interface TvSeriesRepository extends CrudRepository<TvSeries, Long> {
}
