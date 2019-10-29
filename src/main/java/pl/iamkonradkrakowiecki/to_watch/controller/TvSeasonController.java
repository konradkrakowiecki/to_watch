package pl.iamkonradkrakowiecki.to_watch.controller;

import org.springframework.web.bind.annotation.*;
import pl.iamkonradkrakowiecki.to_watch.domain.TvEpisode;
import pl.iamkonradkrakowiecki.to_watch.domain.TvSeason;
import pl.iamkonradkrakowiecki.to_watch.repository.TvSeasonRepository;
import pl.iamkonradkrakowiecki.to_watch.repository.TvSeriesRepository;
import pl.iamkonradkrakowiecki.to_watch.service.TvEpisodeService;
import pl.iamkonradkrakowiecki.to_watch.service.TvSeasonService;

import java.util.Optional;

@RestController
@RequestMapping("/api/tvseason")
public class TvSeasonController {

    private TvSeasonService tvSeasonService;
    private TvSeriesRepository tvSeriesRepository;
    private TvEpisodeService tvEpisodeService;
    private TvSeasonRepository tvSeasonRepository;

    public TvSeasonController(TvSeasonService tvSeasonService, TvSeriesRepository tvSeriesRepository, TvEpisodeService tvEpisodeService, TvSeasonRepository tvSeasonRepository) {
        this.tvSeasonService = tvSeasonService;
        this.tvSeriesRepository = tvSeriesRepository;
        this.tvEpisodeService = tvEpisodeService;
        this.tvSeasonRepository = tvSeasonRepository;
    }

    @GetMapping(value = {"", "/"})
    public Iterable<TvSeason> listTvSeasons() {
        return this.tvSeasonService.list_all_tv_seasons();
    }

    @GetMapping(value = {"/{id}", "/{id}/"})
    public Optional<TvSeason> findTvSeasonById(@PathVariable Long id) {
        return this.tvSeasonService.find_tv_season_by_id(id);
    }

    @PostMapping("/{id}/saveepisode")
    public TvEpisode saveTvEpisode(@PathVariable Long id, @RequestBody TvEpisode tvEpisode) {
        this.tvEpisodeService.save_tv_episode(tvEpisode);
        tvEpisode.setTvSeason(this.tvSeasonRepository.findById(id).get());
        return this.tvEpisodeService.save_tv_episode(tvEpisode);
    }
}
