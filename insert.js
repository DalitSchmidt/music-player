// המשתנה json מכיל אובייקט עם הפרופרטיס name (המכיל את שם האלבום), artist (המכיל את שם האמן) ו- genres (המכיל מערך של המספרי id של הז'אנרים המאפיינים את האלבום)
let json = '{"name":"erger", "artist":"oldplay", "genres": [8,4,6]}'
// המשתנה new_album מבצע JSON.parse למשתנה json
let new_album = JSON.parse( json )
// המשתנה album_id מכיל את המספר id של האלבום
let album_id = 7
// המשתנה genres מכיל את הפרופרטי genres המצוי במשתנה new_album
let genres = new_album.genres
// המשתנה query מכיל מערך ריק
let query = []
// הלולאת forEach עוברת על המשתנה genres ומוסיפה למערך של query את המספרי id של האלבום ושל הז'אנרים
genres.forEach(id => query.push(`(${album_id}, ${id})`))
// המשתנה query מכיל שאילתא המוסיפה את המספרי id של האלבום ושל הז'אנר שנוצרו לטבלה של 'albums_to_genres' (שהיא טבלה מקשרת) ומחברת את התוצאות של השאילתא המופרדות באמצעות פסיקים
query = 'INSERT INTO albums_to_genres (album_id, genre_id) VALUES ' + query.join(', ')