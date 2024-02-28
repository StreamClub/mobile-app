import React from 'react'
import { formatTitle } from '../../utils/formatTitle'
import { MovieTitle } from './MovieTitle'
import { MovieState } from './MovieState'
import { MovieEntry } from '../../entities/MovieListEntry'

type MovieBodyProps = {
    movieEntry: MovieEntry
}

export const MovieBody = (params: MovieBodyProps) => {
    const { movieEntry } = params

    return (
        <>
            <MovieTitle
                title={formatTitle(movieEntry.title)}
                year={movieEntry.year}
            />

            <MovieState available={movieEntry.available} />
        </>
    )
}
