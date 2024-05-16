import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native';
import { colors } from '../assets';
import { createTuples } from '../utils/listManager';
import { TmdbImage, TmdbImageParams, TmdbImageType } from './BasicComponents/TmdbImage';
import { WatchlistEntry } from './Types/Watchlist';

const ENTRIES_PER_ROW = 3;
const entryContainerFlex = 1/ENTRIES_PER_ROW

export type WatchlistParams = {
    watchlist: WatchlistEntry[];
    onPressWatchlistEntry: (entry: WatchlistEntry) => void;
}

const renderWatchlistEntry = (entry: WatchlistEntry, index: number, watchlistParams: WatchlistParams) => {
    const tmdbParams: TmdbImageParams = {
        resource: entry.poster,
        type: TmdbImageType.Cover,
        style: styles.posterStyle,
        altText: entry.title
    }
    const onPress = watchlistParams.onPressWatchlistEntry

    return(
        <Pressable key={index} style={styles.entryContainer} onPress={() => onPress(entry)}>
            <TmdbImage {...tmdbParams}/>
        </Pressable>
    )
}

const renderWatchlistRow = (tuple: WatchlistEntry[], index: number, params: WatchlistParams) => {
    return(
        <View key={index} style={styles.rowContainer}>
            {tuple.map((entry, index) => renderWatchlistEntry(entry, index, params))}
        </View>
    )
}

export const Watchlist = (params: WatchlistParams) => {
    const tuples = createTuples(params.watchlist, ENTRIES_PER_ROW)
    return(
        <View style={styles.container}>
            {tuples.map((tuple, index) => renderWatchlistRow(tuple, index, params))}
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
