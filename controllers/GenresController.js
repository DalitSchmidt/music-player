const GenresController = {
    getNewGenres: ( genres ) => {
        return genres.filter(genre => isNaN( parseInt( genre ) )).map(genre => {
            return {
                genre_name: genre,
                genre_slug: genre.toLowerCase().replace(' ', '-')
            }
        })
    },

    getExistingGenresIds: ( genres ) => {
        return genres.filter(genre => !isNaN( parseInt( genre ) )).map(genre => parseInt( genre ))
    }
}

module.exports = GenresController