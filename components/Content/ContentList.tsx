import React, { useEffect } from 'react'
import { ContentEntry } from '../../entities/ContentEntry'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { MovieEntry } from '../../entities/MovieListEntry'
import { ARTISTS_NAME, CATEGORIES, MOVIES_NAME, SERIES_NAME, USERS_NAME } from '../../constants'
import { SeriesList } from '../Series/SeriesList/SeriesList'
import { MovieList } from '../MovieList'
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { ArtistList } from '../ArtistList'
import { ArtistEntry } from '../../entities/ArtistListEntry'
import { UserEntry } from '../../entities/UsersListEntry'
import { UsersList } from '../UsersList/UsersList'

type ContentListProps = {
    contentEntry: ContentEntry[] | ArtistEntry[] | UserEntry[]
}

export const ContentList = (params: ContentListProps) => {
    
    useEffect(() => {
        console.log("[ContentList] rendered")
    },[])

    const { category } = useAppSelector((state) => state.searchContent)
    switch (CATEGORIES[category]) {
        case SERIES_NAME:
            return <SeriesList seriesList={params.contentEntry as SeriesEntry[]} />
        case MOVIES_NAME:
            return <MovieList movieList={params.contentEntry as MovieEntry[]} />
        case ARTISTS_NAME:
            return <ArtistList artistList={params.contentEntry as ArtistEntry[]} />
        case USERS_NAME:
            return <UsersList usersList={params.contentEntry as UserEntry[]} />
        default:
            return null
    }
}
