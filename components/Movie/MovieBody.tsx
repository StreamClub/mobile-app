import React from 'react'
import { formatTitle } from '../../utils/formatTitle'
import { MovieTitle } from './MovieTitle'
import { MovieEntry } from '../../entities/MovieListEntry'
import { ContentState } from '../Content/contentList/ContentState'

type MovieBodyProps = {
    movieEntry: MovieEntry
}

export const MovieBody = (params: MovieBodyProps) => {
    const { movieEntry } = params;

    return (
        <>
            <MovieTitle
                title={formatTitle(movieEntry.title)}
                year={movieEntry.year}
            />

            <ContentState
                available={movieEntry.available}
                status={movieEntry.status}
            />
        </>
    )
}
