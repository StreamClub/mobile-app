import React from 'react'
import { Pressable } from 'react-native'
import { styles } from './styles/SeriesList.style'
import { SeriesTitle } from './SeriesTitle'
import { SeriesBottomSection } from './SeriesBottomSection'
import { SeriesState } from './SeriesState'
import { SerieEntry } from '../SeriesList'
import { SeriesListCallbacks } from './SeriesListCallbacks'
import { formatScore, toAvailableText } from '../../utils'
import { formatTitle } from '../../utils/formatTitle'

type SeriesDetailProps = {
    serieEntry: SerieEntry
    callbacks: SeriesListCallbacks
}

export const SeriesDetail = (params: SeriesDetailProps) => {
    const { serieEntry, callbacks } = params

    const onSeriePress = (serieEntry: SerieEntry) => {
        params.callbacks.onSeriePress(serieEntry)
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

                <SeriesBottomSection
                    serieEntry={serieEntry}
                    scoreFormatted={formatScore(serieEntry.score)}
                    onSerieSeenPress={callbacks.onSerieSeenPress}
                    onWatchlistPress={callbacks.onWatchlistPress}
                />
            </Pressable>
        </>
    )
}
