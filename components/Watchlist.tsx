import React from 'react'
import { View, StyleSheet } from 'react-native';
import { colors } from '../assets';
import { createTuples } from '../utils/listManager';
import { TmdbImage, TmdbImageParams, TmdbImageType } from './BasicComponents/TmdbImage';
import { WatchlistEntry } from './Types/Watchlist';

const ENTRIES_PER_ROW = 3;
const entryContainerFlex = 1/ENTRIES_PER_ROW

export type WatchlistParams = {
    watchlist: WatchlistEntry[];
}

const renderWatchlistEntry = (entry: WatchlistEntry, index: number) => {
    const params: TmdbImageParams = {
        resource: entry.poster,
        type: TmdbImageType.Cover,
        style: styles.posterStyle,
    }
    return(
        <View key={index} style={styles.entryContainer}>
            <TmdbImage {...params}/>
        </View>
    )
}

const renderWatchlistRow = (tuple: WatchlistEntry[], index: number) => {
    return(
        <View key={index} style={styles.rowContainer}>
            {tuple.map((entry, index) => renderWatchlistEntry(entry, index))}
        </View>
    )
}

export const Watchlist = (params: WatchlistParams) => {
    const tuples = createTuples(params.watchlist, ENTRIES_PER_ROW)
    return(
        <View style={styles.container}>
            {tuples.map((tuple, index) => renderWatchlistRow(tuple, index))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondaryWhite,
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    entryContainer: {
        flex: entryContainerFlex,
        margin: 1,
    },
    posterStyle: {
        width: "100%",
        aspectRatio: 2/3,
    }
})
