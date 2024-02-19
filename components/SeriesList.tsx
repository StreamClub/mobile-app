import React from 'react'
import { ScrollView } from 'react-native'
import { styles } from './SeriesList/styles/SeriesList.style'
import { SeriesEntry } from '../entities/SeriesListEntry'
import { ContentEntry } from '../entities/ContentListEntry'
import { ContentListCallbacks } from './Content/ContentListCallbacks'
import { ContentListEntry } from './Content/ContentListEntry'
import { ContentType } from '../entities/ContentType'

type SeriesListProps = {
    seriesList: SeriesEntry[]
    callbacks: ContentListCallbacks
}

export const SeriesList = (params: SeriesListProps) => {
    const seriesList = params.seriesList

    const onSeriePress = (serieEntry: ContentEntry) => {
        params.callbacks.onContentPress(serieEntry)
    }

    const contentType = new ContentType('series')

    const renderSerieEntry = (serieEntry: SeriesEntry, index: number) => {
        return (
            <ContentListEntry
                index={index}
                contentEntry={serieEntry}
                onSeriePress={onSeriePress}
                callbacks={params.callbacks}
                contentType={contentType}
            />
        )
    }

    return (
        <ScrollView style={styles.serieListContainer}>
            {seriesList.map(renderSerieEntry)}
        </ScrollView>
    )
}
