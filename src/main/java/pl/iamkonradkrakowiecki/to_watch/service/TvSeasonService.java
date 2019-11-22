package pl.iamkonradkrakowiecki.to_watch.service;

import pl.iamkonradkrakowiecki.to_watch.domain.TvSeason;

import java.util.Optional;

public interface TvSeasonService {

    Iterable<TvSeason> list_all_tv_seasons();

    Optional<TvSeason> find_tv_season_by_id(Long id);

    TvSeason save_tv_season(TvSeason tvSeason);

    void delete_tv_season(Long id);
}
