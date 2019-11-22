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

@Entity
@Setter
@Getter
@AllArgsConstructor
@Table(name = "tv_episode")
public class TvEpisode {

    public TvEpisode() {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private Long imdb_id;
    private Integer episode_number;
    private String name;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate release_date;

    private Boolean to_watch;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate when_watched;
    private String where_watched;
    private String note;
    private Integer rating;

    @ManyToOne()
    @JoinColumn(name = "tv_season_id")
    @JsonIgnore
    private TvSeason tvSeason;
}
