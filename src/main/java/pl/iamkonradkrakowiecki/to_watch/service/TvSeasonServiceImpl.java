package pl.iamkonradkrakowiecki.to_watch.service;

import org.springframework.stereotype.Service;
import pl.iamkonradkrakowiecki.to_watch.domain.TvSeason;
import pl.iamkonradkrakowiecki.to_watch.repository.TvSeasonRepository;

import java.util.Optional;

@Service
public class TvSeasonServiceImpl implements TvSeasonService {

    private TvSeasonRepository tvSeasonRepository;

    public TvSeasonServiceImpl(TvSeasonRepository tvSeasonRepository) {
        this.tvSeasonRepository = tvSeasonRepository;
    }

    @Override
    public Iterable<TvSeason> list_all_tv_seasons() {
            return this.tvSeasonRepository.findAll();
    }

    @Override
    public Optional<TvSeason> find_tv_season_by_id(Long id) {
        return this.tvSeasonRepository.findById(id);
    }

    @Override
    public TvSeason save_tv_season(TvSeason tvSeason) {
        return tvSeasonRepository.save(tvSeason);
    }

    @Override
    public void delete_tv_season(Long id) {
        this.tvSeasonRepository.deleteById(id);
    }
}
