import React, { useState } from 'react'
import { Pressable, View, } from 'react-native'
import { handleSeriesWatchlistPress } from '../../utils/handleWatchlistPress'
import { WatchlistButton } from '../../components/BasicComponents/WatchlistButton'
import { useSession } from '../../context/ctx'
import { styles } from './styles/SeasonDetails.styles'
import { SeenSection } from '../Content/SeenSection'
import { ContentType } from '../../entities/ContentType'

type SeasonHeaderParams = {
    seen: boolean,
    seasonId: number,
    seriesId: number
}

export const SeasonHeader = (params: SeasonHeaderParams) => {
    const contentType = new ContentType('season')
    return (
        <View style={{margin: 10}}>
            <SeenSection 
                seenState={params.seen} 
                contentId={params.seasonId.toString()} 
                seriesId={params.seriesId.toString()}
                contentType={contentType} />
        </View>
    )
}