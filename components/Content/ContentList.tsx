import React from 'react'
import { ContentEntry } from '../../entities/ContentListEntry'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { MovieEntry } from '../../entities/MovieListEntry'
import { ARTISTS_NAME, MOVIES_NAME, SERIES_NAME } from '../../constants'
import { SeriesList } from '../SeriesList'
import { MovieList } from '../MovieList'

type ContentListProps = {
    contentType: string
    contentEntry: ContentEntry[]
}

export const ContentList = (params: ContentListProps) => {
    switch (params.contentType) {
        case SERIES_NAME:
            return (
                <SeriesList seriesList={params.contentEntry as SeriesEntry[]} />
            )
        case MOVIES_NAME:
            return <MovieList movieList={params.contentEntry as MovieEntry[]} />
        case ARTISTS_NAME:
            return //TODO: Implement ArtistBody
        default:
            return null
    }
}
