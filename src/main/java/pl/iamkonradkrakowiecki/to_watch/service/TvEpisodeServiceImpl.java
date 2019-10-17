package pl.iamkonradkrakowiecki.to_watch.service;

import org.springframework.stereotype.Service;
import pl.iamkonradkrakowiecki.to_watch.domain.TvEpisode;
import pl.iamkonradkrakowiecki.to_watch.repository.TvEpisodeRepository;

import java.util.Optional;

@Service
public class TvEpisodeServiceImpl implements TvEpisodeService {

    private TvEpisodeRepository tvEpisodeRepository;

    public TvEpisodeServiceImpl(TvEpisodeRepository tvEpisodeRepository) {
        this.tvEpisodeRepository = tvEpisodeRepository;
    }

    @Override
    public Iterable<TvEpisode> list_all_tv_episodes() {
        return this.tvEpisodeRepository.findAll();
    }

    @Override
    public Optional<TvEpisode> find_tv_episode_by_id(Long id) {
        return this.tvEpisodeRepository.findById(id);
    }

    @Override
    public TvEpisode save_tv_episode(TvEpisode tvEpisode) {
        return tvEpisodeRepository.save(tvEpisode);
    }
}
