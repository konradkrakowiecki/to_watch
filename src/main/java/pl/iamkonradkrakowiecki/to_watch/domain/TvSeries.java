package pl.iamkonradkrakowiecki.to_watch.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


@Entity
@Setter
@Getter
@AllArgsConstructor
@Table(name = "tv_series")
public class TvSeries {

    public TvSeries() {}

    @Id
    @GeneratedValue
    private Long Id;

    private String type;
    private Long imdb_id;
    private String title;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate release_date;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate last_update;

    private Boolean to_watch;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate when_watched;
    private String where_watched;
    private String note;
    private Integer rating;

    @OneToMany(mappedBy = "tvSeries")
    private Set<TvSeason> seasons = new HashSet<>();
}
