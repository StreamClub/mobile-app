import React, { useState } from 'react'
import { Pressable } from 'react-native'
import { styles } from './styles/SeriesList.style'
import { SeriesTitle } from './SeriesTitle'
import { SeriesBottomSection } from './SeriesBottomSection'
import { SeriesState } from './SeriesState'
import { SerieEntry } from '../SeriesList'
import { SeriesListCallbacks } from './SeriesListCallbacks'

const MAX_TITLE_LENGHT = 50
type SeriesDetailProps = {
    serieEntry: SerieEntry
    callbacks: SeriesListCallbacks
}

export const SeriesDetail = (params: SeriesDetailProps) => {
    const { serieEntry, callbacks } = params
    let serieTitle = serieEntry.title
    if (serieEntry.title.length > MAX_TITLE_LENGHT) {
        serieTitle = serieEntry.title.slice(0, MAX_TITLE_LENGHT).trim() + '...'
    }

    const availableText = serieEntry.available
        ? 'Disponible en tus plataformas'
        : ''
    const scoreFormatted = serieEntry.score.toString() + '/10'
    const seenIcon = serieEntry.seen
        ? require('../../assets/icons/unmarkAsSeen.png')
        : require('../../assets/icons/markAsSeen.png')
    const [inWatchlist, setInWatchlist] = useState(serieEntry.inWatchlist)

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
                    title={serieTitle}
                    years={{
                        releaseYear: serieEntry.releaseYear,
                        lastYear: serieEntry.lastYear,
                    }}
                    status={serieEntry.status}
                />

                <SeriesState
                    status={serieEntry.status}
                    availableText={availableText}
                />

                <SeriesBottomSection
                    serieEntry={serieEntry}
                    scoreFormatted={scoreFormatted}
                    seenIcon={seenIcon}
                    inWatchlist={inWatchlist}
                    setInWatchlist={setInWatchlist}
                    onSerieSeenPress={callbacks.onSerieSeenPress}
                    onWatchlistPress={callbacks.onWatchlistPress}
                />
            </Pressable>
        </>
    )
}
