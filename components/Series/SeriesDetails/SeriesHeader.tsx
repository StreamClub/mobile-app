import React from 'react'
import { View } from 'react-native'
import { SeenSection } from '../../Content/SeenSection'
import { ContentType } from '../../../entities/ContentType'
import { SeriesDetail } from '../../../entities/Details/Series/SeriesDetailEntry'
import { WatchlistSection } from '../../Content/WatchlistSection'
import { useAppSelector } from '../../../hooks/redux/useAppSelector'
import { ShareContentButton } from '../../Content/ShareContentButton'

type SeriesHeaderParams = {
    series?: SeriesDetail
}

export const SeriesHeader = (params: SeriesHeaderParams) => {
    const series = params.series
    const contentType = new ContentType('series')
    const { focusedEntry } = useAppSelector((state) => state.searchContent)

    if (!series) {
        return null
    }
    return (
        <>
            <View style={{ margin: 0 }}>
                <ShareContentButton 
                    title={series.title} 
                    poster={series.poster} />
            </View>
            <View style={{ margin: 10 }}>
                <SeenSection
                    seenState={false}
                    contentId={series.id}
                    contentType={contentType}
                />
            </View>
            <View style={{ margin: 10 }}>
                <WatchlistSection
                    contentEntry={series}
                    contentType={contentType}
                    inWatchlist={focusedEntry.inWatchlist}
                />
            </View>
        </>
    )
}
