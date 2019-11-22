package pl.iamkonradkrakowiecki.to_watch.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
@Table(name = "tv_season")
public class TvSeason {

    public TvSeason() {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private Long imdb_id;
    private Integer season_number;
    private String name;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate release_date;

    private Boolean to_watch;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate when_watched;
    private String where_watched;
    private String note;
    private Integer rating;

    @OneToMany(mappedBy = "tvSeason")
    private Set<TvEpisode> episodes = new HashSet<>();

    @ManyToOne()
    @JoinColumn(name="tv_series_id")
    @JsonIgnore
    private TvSeries tvSeries;
}
