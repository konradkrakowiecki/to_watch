package pl.iamkonradkrakowiecki.to_watch.service;

import org.springframework.stereotype.Service;
import pl.iamkonradkrakowiecki.to_watch.domain.TvSeries;
import pl.iamkonradkrakowiecki.to_watch.repository.TvSeriesRepository;

import java.util.Optional;

@Service
public class TvSeriesServiceImpl implements TvSeriesService {

    private TvSeriesRepository tvSeriesRepository;

    public TvSeriesServiceImpl(TvSeriesRepository tvSeriesRepository) {
        this.tvSeriesRepository = tvSeriesRepository;
    }

    @Override
    public Iterable<TvSeries> list_all_tv_series() {
        return this.tvSeriesRepository.findAll();
    }

    @Override
    public Optional<TvSeries> find_tv_series_by_id(Long id) {
        return this.tvSeriesRepository.findById(id);
    }

    @Override
    public TvSeries save_tv_series(TvSeries tvSeries) {
        return tvSeriesRepository.save(tvSeries);
    }
}
