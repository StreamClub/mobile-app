import React from 'react'
import { ScrollView } from 'react-native'
import { styles } from './styles/SeriesList.style'
import { SeriesEntry } from '../../../entities/SeriesListEntry'
import { ContentListEntry } from '../../Content/ContentListEntry'
import { ContentType } from '../../../entities/ContentType'

type SeriesListProps = {
    seriesList: SeriesEntry[]
}

export const SeriesList = (params: SeriesListProps) => {
    const seriesList = params.seriesList
    const contentType = new ContentType('series')

    const renderSeriesEntry = (seriesEntry: SeriesEntry, index: number) => {
        return (
            <ContentListEntry
                key={index}
                contentEntry={seriesEntry}
                contentType={contentType}
            />
        )
    }

    return (
        <ScrollView style={styles.seriesListContainer}>
            {seriesList.map(renderSeriesEntry)}
        </ScrollView>
    )
}
