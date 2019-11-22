package pl.iamkonradkrakowiecki.to_watch.controller;

import org.springframework.web.bind.annotation.*;
import pl.iamkonradkrakowiecki.to_watch.domain.TvSeason;
import pl.iamkonradkrakowiecki.to_watch.domain.TvSeries;
import pl.iamkonradkrakowiecki.to_watch.repository.TvSeriesRepository;
import pl.iamkonradkrakowiecki.to_watch.service.TvSeasonService;
import pl.iamkonradkrakowiecki.to_watch.service.TvSeriesService;

import java.util.Optional;

@RestController
@RequestMapping("/api/tvseries")
public class TvSeriesController {

    private TvSeasonService tvSeasonService;
    private TvSeriesService tvSeriesService;
    private TvSeriesRepository tvSeriesRepository;

    public TvSeriesController(TvSeasonService tvSeasonService, TvSeriesService tvSeriesService, TvSeriesRepository tvSeriesRepository) {
        this.tvSeasonService = tvSeasonService;
        this.tvSeriesService = tvSeriesService;
        this.tvSeriesRepository = tvSeriesRepository;
    }

    @GetMapping(value = {"", "/"})
    public Iterable<TvSeries> listTvSeries() {
        return this.tvSeriesService.list_all_tv_series();
    }

    @GetMapping(value = {"/{id}", "/{id}/"})
    public Optional<TvSeries> findTvSeriesById(@PathVariable Long id) {
        return this.tvSeriesService.find_tv_series_by_id(id);
    }

    @PostMapping("/save")
    public TvSeries saveTvSeries(@RequestBody TvSeries tvSeries) {
        return this.tvSeriesService.save_tv_series(tvSeries);
    }

    @PostMapping("/{id}/saveseason")
    public TvSeason saveTvSeasons(@PathVariable Long id, @RequestBody TvSeason tvSeason) {
        this.tvSeasonService.save_tv_season(tvSeason);
        tvSeason.setTvSeries(this.tvSeriesRepository.findById(id).get());
        return this.tvSeasonService.save_tv_season(tvSeason);
    }

    @DeleteMapping(value = {"/{id}/delete", "/{id}/delete"})
    public void delete(@PathVariable Long id) {
        this.tvSeriesService.delete_tv_series(id);
    }
}
