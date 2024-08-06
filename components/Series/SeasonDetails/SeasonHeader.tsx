import React from 'react'
import { View } from 'react-native'
import { SeenSection } from '../../Content/SeriesSeenSection'
import { ContentType } from '../../../entities/ContentType'
import { Season } from '../../../entities/Details/Series/Season'
import { PercentSection } from '../../Content/PercentSection'
import { useAppSelector } from '../../../hooks/redux/useAppSelector'
import { useSeenPress } from '../../../hooks/useSeenPress'

type SeasonHeaderParams = {
    season?: Season
}

export const SeasonHeader = (params: SeasonHeaderParams) => {
    const contentType = new ContentType('season')
    const { focusedEntry } = useAppSelector((state) => state.searchContent)
    const { onPress: onPressPercent, loading : loadingPercent } = useSeenPress()

    if (!params.season) {
        return null
    }
    return (
        <View style={{ margin: 10 }}>
            <PercentSection
                seenPercent={focusedEntry.seen}
                onPress={()=> console.log('pressed')}
                loading={false}
                seasonId={params.season.id.toString()}
            />
            
            <SeenSection
                seenState={params.season.seen}
                contentId={params.season.id.toString()}
                seriesId={params.season.seriesId.toString()}
                contentType={contentType}
            />
        </View>
    )
}
