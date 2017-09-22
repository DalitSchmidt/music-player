let json = '{"name":"erger", "artist":"oldplay", "genres": [8,4,6]}'
let new_album = JSON.parse( json )
let album_id = 7
let genres = new_album.genres
let query = []
genres.forEach(id => query.push(`(${album_id}, ${id})`))
query = 'INSERT INTO albums_to_genres (album_id, genre_id) VALUES ' + query.join(', ')