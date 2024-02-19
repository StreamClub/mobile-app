import React from 'react'
import { Pressable } from 'react-native'
import { styles } from './styles/SeriesList.style'
import { SeriesTitle } from './SeriesTitle'
import { SeriesState } from './SeriesState'
import { SeriesEntry } from '../../entities/SeriesListEntry'
import { formatScore, toAvailableText } from '../../utils'
import { formatTitle } from '../../utils/formatTitle'
import { BottomSection } from '../Content/BottomSection'
import { ContentListCallbacks } from '../Content/ContentListCallbacks'

type SeriesDetailProps = {
    serieEntry: SeriesEntry
    callbacks: ContentListCallbacks
}

export const SeriesDetail = (params: SeriesDetailProps) => {
    const { serieEntry, callbacks } = params

    const onSeriePress = (serieEntry: SeriesEntry) => {
        params.callbacks.onContentPress(serieEntry)
    }

    return (
        <>
            <Pressable
                onPress={() => onSeriePress(serieEntry)}
                style={styles.detailsContainer}
            >
                <SeriesTitle
                    title={formatTitle(serieEntry.title)}
                    years={{
                        releaseYear: serieEntry.releaseYear,
                        lastYear: serieEntry.lastYear,
                    }}
                    status={serieEntry.status}
                />

                <SeriesState
                    status={serieEntry.status}
                    availableText={toAvailableText(serieEntry.available)}
                />

                <BottomSection
                    contentEntry={serieEntry}
                    scoreFormatted={formatScore(serieEntry.score)}
                    onSeenPress={callbacks.onSeenPress}
                    onWatchlistPress={callbacks.onWatchlistPress}
                />
            </Pressable>
        </>
    )
}
