import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Pressable } from 'react-native';
import { colors } from '../assets';
import { createTuples } from '../utils/listManager';
import { TmdbImage, TmdbImageParams, TmdbImageType } from './BasicComponents/TmdbImage';
import { WatchlistEntry } from './Types/Watchlist';
import { ContentDetailsParams } from '../apiCalls/params/content/ContentDetailsParams';
import { ContentType } from './Types/ContentType';
import { router } from 'expo-router';
import { List, ListParams, ListEntry } from './BasicComponents/List';
import { useGetWatchlist } from '../apiCalls/profile';
import { LoadingComponent } from './BasicComponents/LoadingComponent';
import { TitleText } from './BasicComponents/TitleText';

const ENTRIES_PER_ROW = 3;
const entryContainerFlex = 1/ENTRIES_PER_ROW

export type WatchlistParams = {
    userId: number;
}

export const Watchlist = (params: WatchlistParams) => {
    const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([]);
    const [publicWatchlist, setPublicWatchlist] = useState(true);
    const [nextPage, setNextPage] = useState(1);
    const {getWatchlist, loading } = useGetWatchlist(params.userId);

    useEffect(() => {
        console.log(params.userId);
        getWatchlist(nextPage, onSuccessGetWatchlistPage);
    }, [])

    const onSuccessGetWatchlistPage = (response: any) => {
        console.log(response.data)
        const newEntries: WatchlistEntry[] = response.data.results
        setWatchlist(prevWatchlist => [...prevWatchlist, ...newEntries]);
        if (newEntries.length > 0) {
          setNextPage(nextPage + 1)
        }
    }

    const onReachedEnd = () => {
        console.log('[Watchlist] Getting page', nextPage)
        getWatchlist(nextPage, onSuccessGetWatchlistPage);
    }

    const onPressWatchlistEntry = (entry: WatchlistEntry) => {
        const contentScreenParams: ContentDetailsParams = {
          id: entry.id.toString(),
        }
        //TODO: Refactorizar para usar o bien entities o bien un enum
        const pathname = entry.contentType === ContentType.Movie ? '/movie' : '/serie'
        router.push({ pathname: pathname, params: contentScreenParams })
    }
    
    const watchlistAsList: ListEntry[] = watchlist.map((entry) => {
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
        onReachedEnd: onReachedEnd,
    }


    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <TitleText body="Watchlist" style={styles.titleText} size='medium'/>
            </View>
            {loading && (nextPage == 1)?
                <LoadingComponent /> :
                <List {...listParams}/>
            }
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
    },
    titleText: {
        fontWeight:'bold', 
        marginLeft: 10
    },
})
