import React from 'react'
import { View } from 'react-native'
import { SeenSection } from '../../Content/SeenSection'
import { ContentType } from '../../../entities/ContentType'
import { Season } from '../../../entities/Details/Series/Season'

type SeasonHeaderParams = {
    season?: Season
}

export const SeasonHeader = (params: SeasonHeaderParams) => {
    const contentType = new ContentType('season')
    if (!params.season) {
        return null
    }
    return (
        <View style={{ margin: 10 }}>
            <SeenSection
                seenState={params.season.seen}
                contentId={params.season.id.toString()}
                seriesId={params.season.seriesId.toString()}
                contentType={contentType}
            />
        </View>
    )
}
