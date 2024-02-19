import React from 'react'
import { ScrollView } from 'react-native'
import { styles } from './SeriesList/styles/SeriesList.style'
import { SeriesListCallbacks } from './SeriesList/SeriesListCallbacks'
import { SeriesListEntry } from './SeriesList/SeriesListEntry'

export type SerieEntry = {
    id: string
    title: string
    poster: string
    available: boolean
    releaseYear: string
    lastYear: string
    score: number
    seen: boolean
    inWatchlist: boolean
    status: string
}

type SeriesListProps = {
    seriesList: SerieEntry[]
    callbacks: SeriesListCallbacks
}

export const SeriesList = (params: SeriesListProps) => {
    const seriesList = params.seriesList

    const onSeriePress = (serieEntry: SerieEntry) => {
        params.callbacks.onSeriePress(serieEntry)
    }

    const renderSerieEntry = (serieEntry: SerieEntry, index: number) => {
        return (
            <SeriesListEntry
                key={index}
                index={index}
                serieEntry={serieEntry}
                onSeriePress={onSeriePress}
                callbacks={params.callbacks}
            />
        )
    }

    return (
        <ScrollView style={styles.serieListContainer}>
            {seriesList.map(renderSerieEntry)}
        </ScrollView>
    )
}
