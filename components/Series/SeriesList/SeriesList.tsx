import React from 'react'
import { FlatList, ScrollView } from 'react-native'
import { styles } from './styles/SeriesList.style'
import { SeriesEntry } from '../../../entities/SeriesListEntry'
import { ContentListEntry } from '../../Content/ContentListEntry'
import { ContentType } from '../../../entities/ContentType'
import { useSearchContent } from '../../../hooks/search/useSearchContent'

type SeriesListProps = {
    searchNextPage: (...params: any[]) => void,
    seriesList: SeriesEntry[]
}

export const SeriesList = (params: SeriesListProps) => {
    const seriesList = params.seriesList;
    const contentType = new ContentType('series');

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
        <FlatList 
            style={styles.seriesListContainer}
            data={seriesList}
            renderItem={({item, index}) => renderSeriesEntry(item, index)}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0}
            onEndReached={params.searchNextPage}
        />
    )
}
