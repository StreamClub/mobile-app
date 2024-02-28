import React from 'react'
import { View, } from 'react-native'
import { SeenSection } from '../Content/SeenSection'
import { ContentType } from '../../entities/ContentType'
import { SeriesDetail } from '../../entities/Details/Series/SeriesDetailEntry'
import { WatchlistSection } from '../Content/WatchlistSection'

type SeriesHeaderParams = {
    series?: SeriesDetail
}

export const SeriesHeader = (params: SeriesHeaderParams) => {
    const series = params.series;
    const contentType = new ContentType('series')
    if (!series){
        return null
    }
    return (
        <>
            <View style={{margin: 10}}>
                <SeenSection seenState={series.seen} contentId={series.id} contentType={contentType} />
            </View>
            <View style={{margin: 10}}>
                <WatchlistSection contentEntry={series} contentType={contentType} />
            </View>
        </>
    )
}