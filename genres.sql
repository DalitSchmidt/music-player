CREATE TABLE genres (
    genre_id int(7) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    genre_slug varchar(50) UNIQUE NOT NULL,
    genre_name varchar(50) NOT NULL
);

CREATE TABLE albums_to_genres (
    genre_id int(7) UNSIGNED NOT NULL,
    album_id int(7) UNSIGNED NOT NULL,
    FOREIGN KEY (album_id) REFERENCES albums(album_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);

SELECT * FROM genres WHERE genre_id IN (
    SELECT genre_id FROM albums_to_genres WHERE album_id = 2
)
