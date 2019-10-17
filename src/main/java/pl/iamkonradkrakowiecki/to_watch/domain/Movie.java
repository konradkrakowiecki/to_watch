package pl.iamkonradkrakowiecki.to_watch.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
public class Movie {

    public Movie() {}

    @Id
    @GeneratedValue
    private Long id;

    private Long imdb_id;
    private String title;
    private String director;
    @JsonFormat(pattern = "dd.MM.yyyy")
    private LocalDate release_date;

    private Boolean to_watch;
    @JsonFormat(pattern = "dd.MM.yyyy")
    private LocalDate when_watched;
    private String where_watched;
    private String note;
    private Integer rating;
}
