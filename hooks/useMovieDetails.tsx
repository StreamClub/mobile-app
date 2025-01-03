import { useState } from 'react'
import { MovieDetail } from '../entities/Details/MovieDetailEntry'

export const useMovieDetail = () => {
    const [movie, setMovieState] = useState<MovieDetail>()

    const setMovie = (data: any) => {
        const movieEntry = MovieDetail.fromJson(data)
        setMovieState(movieEntry);
    }

    return { movie, setMovie }
}
