import React from 'react'
import { View, } from 'react-native'
import { SeenSection } from '../Content/SeenSection'
import { MovieDetail } from '../../entities/Details/MovieDetailEntry'
import { ContentType } from '../../entities/ContentType'
import { WatchlistSection } from '../Content/WatchlistSection'

type MovieHeaderParams = {
    movie?: MovieDetail
}

export const MovieHeader = (params: MovieHeaderParams) => {
    const movie = params.movie;
    const contentType = new ContentType('movie')
    console.log(movie?.seen);
    if (!movie){
        return null
    }
    return (
        <>
            <View style={{margin: 10}}>
                <SeenSection seenState={movie.seen} contentId={movie.id} contentType={contentType} />
            </View>
            <View style={{margin: 10}}>
                <WatchlistSection contentEntry={movie} contentType={contentType} />
            </View>
        </>
    )
}