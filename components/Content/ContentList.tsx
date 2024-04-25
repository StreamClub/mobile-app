import React from 'react'
import { ContentEntry } from '../../entities/ContentListEntry'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { MovieEntry } from '../../entities/MovieListEntry'
import { ARTISTS_NAME, MOVIES_NAME, SERIES_NAME } from '../../constants'
import { SeriesList } from '../Series/SeriesList/SeriesList'
import { MovieList } from '../MovieList'
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { ArtistList } from '../ArtistList'
import { ArtistEntry } from '../../entities/ArtistListEntry'

type ContentListProps = {
    contentEntry: ContentEntry[] | ArtistEntry[]
}

export const ContentList = (params: ContentListProps) => {
    const { category } = useAppSelector((state) => state.searchContent)
    switch (category) {
        case SERIES_NAME:
            return <SeriesList seriesList={params.contentEntry as SeriesEntry[]} />
        case MOVIES_NAME:
            return <MovieList movieList={params.contentEntry as MovieEntry[]} />
        case ARTISTS_NAME:
            return (
                <ArtistList artistList={params.contentEntry as ArtistEntry[]} />
            )
        default:
            return null
    }
}
