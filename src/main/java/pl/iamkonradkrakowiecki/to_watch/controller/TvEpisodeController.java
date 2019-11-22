package pl.iamkonradkrakowiecki.to_watch.controller;

import org.springframework.web.bind.annotation.*;
import pl.iamkonradkrakowiecki.to_watch.domain.TvEpisode;
import pl.iamkonradkrakowiecki.to_watch.service.TvEpisodeService;

import java.util.Optional;

@RestController
@RequestMapping("/api/tvepisode")
public class TvEpisodeController {

    private TvEpisodeService tvEpisodeService;

    public TvEpisodeController(TvEpisodeService tvEpisodeService) {
        this.tvEpisodeService = tvEpisodeService;
    }

    @GetMapping(value = {"", "/"})
    public Iterable<TvEpisode> listTvEpisodes() {
        return this.tvEpisodeService.list_all_tv_episodes();
    }

    @GetMapping(value = {"/{id}", "/{id}/"})
    public Optional<TvEpisode> findTvEpisodeById(@PathVariable Long id) {
        return this.tvEpisodeService.find_tv_episode_by_id(id);
    }

    @PostMapping("/save")
    public TvEpisode saveTvEpisode(@RequestBody TvEpisode tvEpisode) {
        return this.tvEpisodeService.save_tv_episode(tvEpisode);
    }

    @DeleteMapping(value = {"/{id}/delete", "/{id}/delete"})
    public void delete(@PathVariable Long id) {
        this.tvEpisodeService.delete_tv_episode(id);
    }
}
