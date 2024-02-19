import React from 'react'
import { ScrollView } from 'react-native'
import { styles } from './SeriesList/styles/SeriesList.style'
import { SeriesEntry } from '../entities/SeriesListEntry'
import { ContentListEntry } from './Content/ContentListEntry'
import { ContentType } from '../entities/ContentType'

type SeriesListProps = {
    seriesList: SeriesEntry[]
}

export const SeriesList = (params: SeriesListProps) => {
    const seriesList = params.seriesList
    const contentType = new ContentType('series')

    const renderSerieEntry = (serieEntry: SeriesEntry, index: number) => {
        return (
            <ContentListEntry
                key={index}
                contentEntry={serieEntry}
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
