package pl.iamkonradkrakowiecki.to_watch.service;

import pl.iamkonradkrakowiecki.to_watch.domain.TvEpisode;

import java.util.Optional;

public interface TvEpisodeService {

    Iterable<TvEpisode> list_all_tv_episodes();

    Optional<TvEpisode> find_tv_episode_by_id(Long id);

    TvEpisode save_tv_episode(TvEpisode tvEpisode);

    void delete_tv_episode(Long id);
}
