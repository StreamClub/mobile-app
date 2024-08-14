import React from 'react'
import { View } from 'react-native'
import { ContentType } from '../../../entities/ContentType'
import { Season } from '../../../entities/Details/Series/Season'
import { PercentSection } from '../../Content/PercentSection'
import { useAppSelector } from '../../../hooks/redux/useAppSelector'
import { useSeenPress } from '../../../hooks/useSeenPress'
import { SeasonSeenSection } from '../../Content/SeasonSeenSection'

type SeasonHeaderParams = {
    season?: Season
}

export const SeasonHeader = (params: SeasonHeaderParams) => {
    const contentType = new ContentType('season')
    const { focusedEntry, focusedSeason } = useAppSelector((state) => state.searchContent)

    // const { onPress: onPressPercent, loading : loadingPercent } = useSeenPress()

    return (
        <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <PercentSection
                seenPercent={focusedEntry.seen}
                onPress={()=> console.log('pressed')}
                loading={false}
                seasonId={focusedSeason.seasonId.toString()}
            />
            <View style={{width: 10}}/>

            <SeasonSeenSection
                seriesId={focusedEntry.id.toString()}
                seasonId={focusedSeason.seasonId.toString()}
            />
        </View>
    )
}
