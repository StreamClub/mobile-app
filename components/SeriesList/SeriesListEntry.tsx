import React from 'react'
import { View } from 'react-native'
import { styles } from './styles/SeriesList.style'
import { SeriesCover } from './SeriesCover'
import { SeriesDetail } from './SeriesDetail'
import { SerieEntry } from '../SeriesList'
import { SeriesListCallbacks } from './SeriesListCallbacks'

type SeriesListEntryProps = {
    index: number
    serieEntry: SerieEntry
    onSeriePress: (serieEntry: SerieEntry) => void
    callbacks: SeriesListCallbacks
}

export const SeriesListEntry = (params: SeriesListEntryProps) => {
    const { index, serieEntry, onSeriePress } = params

    return (
        <View key={index}>
            <View style={styles.serieEntryContainer}>
                <SeriesCover
                    seriesEntry={serieEntry}
                    onSeriesPress={onSeriePress}
                />

                <SeriesDetail
                    serieEntry={serieEntry}
                    callbacks={params.callbacks}
                />
            </View>
            <View
                style={{
                    height: 1,
                    backgroundColor: 'black',
                    width: '90%',
                    marginBottom: 10,
                    alignSelf: 'center',
                }}
            ></View>
        </View>
    )
}
