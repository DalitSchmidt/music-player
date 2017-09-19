CREATE TABLE genres (
    genre_id int(7) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    genre_name varchar(50) UNIQUE NOT NULL
);

CREATE TABLE genres_to_albums (
    genre_id int(7) UNSIGNED NOT NULL,
    album_id int(7) UNSIGNED NOT NULL,
    FOREIGN KEY (album_id) REFERENCES albums(album_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);