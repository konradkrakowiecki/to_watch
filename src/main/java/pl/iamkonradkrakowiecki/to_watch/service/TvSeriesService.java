package pl.iamkonradkrakowiecki.to_watch.service;

import pl.iamkonradkrakowiecki.to_watch.domain.TvSeries;

import java.util.Optional;

public interface TvSeriesService {

    Iterable<TvSeries> list_all_tv_series();

    Optional<TvSeries> find_tv_series_by_id(Long id);

    TvSeries save_tv_series(TvSeries tvSeries);

    void delete_tv_series(Long id);
}
