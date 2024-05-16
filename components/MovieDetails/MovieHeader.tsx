import React, { useEffect } from 'react'
import { View } from 'react-native'
import { SeenSection } from '../Content/SeenSection'
import { MovieDetail } from '../../entities/Details/MovieDetailEntry'
import { ContentType } from '../../entities/ContentType'
import { WatchlistSection } from '../Content/WatchlistSection'
import { useAppSelector } from '../../hooks/redux/useAppSelector'


type MovieHeaderParams = {
    movie?: MovieDetail
    setMovie: (movie: MovieDetail) => void
}

export const MovieHeader = (params: MovieHeaderParams) => {
    const movie = params.movie
    const contentType = new ContentType('movie')
    const { focusedEntry } = useAppSelector((state) => state.searchContent)
    

    if (!movie) {
        return null
    }

    return (
        <>
            <View style={{ margin: 10 }}>
                <SeenSection
                    seenState={movie.seen}
                    contentId={movie.id}
                    contentType={contentType}
                />
            </View>
            <View style={{ margin: 10 }}>
                <WatchlistSection
                    contentEntry={movie}
                    contentType={contentType}
                    inWatchlist={focusedEntry.inWatchlist}
                />
            </View>
        </>
    )
}
