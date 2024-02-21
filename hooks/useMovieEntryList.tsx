import { useState } from 'react'
import { MovieEntry } from '../entities/MovieListEntry'

export const useMovieEntryList = () => {
    const [movieList, setMovieList] = useState<MovieEntry[]>([])

    const setMovieListEntries = (data: any) => {
        const movieList: MovieEntry[] = []
        const moviesResponse = data.results
        moviesResponse.forEach((movie: any) => {
            const movieEntry: MovieEntry = MovieEntry.fromJson(movie)
            movieList.push(movieEntry)
        })
        setMovieList(movieList)
    }

    return { movieList, setMovieListEntries }
}
