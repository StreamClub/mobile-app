import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native';
import { colors } from '../assets';
import { createTuples } from '../utils/listManager';
import { TmdbImage, TmdbImageParams, TmdbImageType } from './BasicComponents/TmdbImage';
import { WatchlistEntry } from './Types/Watchlist';
import { ContentDetailsParams } from '../apiCalls/params/content/ContentDetailsParams';
import { ContentType } from './Types/ContentType';
import { router } from 'expo-router';
import { List, ListParams, ListEntry } from './BasicComponents/List';

const ENTRIES_PER_ROW = 3;
const entryContainerFlex = 1/ENTRIES_PER_ROW

export type WatchlistParams = {
    watchlist: WatchlistEntry[];
    onReachedEnd: () => void;
}

export const Watchlist = (params: WatchlistParams) => {
    
    const onPressWatchlistEntry = (entry: WatchlistEntry) => {
        console.log('entry', entry)
        const contentScreenParams: ContentDetailsParams = {
          id: entry.id.toString(),
        }
    
        //TODO: Refactorizar para usar o bien entities o bien un enum
        const pathname = entry.contentType === ContentType.Movie ? '/movie' : '/serie'
        router.push({ pathname: pathname, params: contentScreenParams })
    }
    
    const watchlistAsList: ListEntry[] = params.watchlist.map((entry) => {
        return {
            itemObject: entry,
            tmdbResource: entry.poster,
            altText: entry.title,
        }
    })


    const listParams: ListParams = {
        list: watchlistAsList,
        type: TmdbImageType.Cover,
        listEntryStyle: styles.posterStyle,
        entriesPerRow: ENTRIES_PER_ROW,
        onPressListEntry: onPressWatchlistEntry,
        onReachedEnd: params.onReachedEnd,
    }


    return(
        <View style={styles.container}>
            <List {...listParams}/>
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
