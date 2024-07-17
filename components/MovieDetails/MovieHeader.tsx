import React, { useEffect } from 'react'
import { Pressable, View, StyleSheet } from 'react-native'
import { SeenSection } from '../Content/SeenSection'
import { MovieDetail } from '../../entities/Details/MovieDetailEntry'
import { ContentType } from '../../entities/ContentType'
import { WatchlistSection } from '../Content/WatchlistSection'
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { ShareContentButton } from '../Content/ShareContentButton'
import { useWatchlistPress } from '../../hooks/useWatchlistPress'
import { WatchlistButton } from '../BasicComponents/WatchlistButton'


type MovieHeaderParams = {
    movie?: MovieDetail
    setMovie: (movie: MovieDetail) => void
}

export const MovieHeader = (params: MovieHeaderParams) => {
    const movie = params.movie
    const contentType = new ContentType('movie')
    const { focusedEntry } = useAppSelector((state) => state.searchContent)
    const { onPressFocusedEntry, loading } = useWatchlistPress({id: focusedEntry.id, inWatchlist:focusedEntry.inWatchlist}, contentType)

    if (!movie) {
        return null
    }

    return (
        <>
            <View style={{ margin: 0 }}>
                <ShareContentButton 
                    title={movie.title} 
                    poster={movie.poster} />
            </View>
            <View style={{ margin: 10 }}>
                <SeenSection
                    seenState={movie.seen}
                    contentId={movie.id}
                    contentType={contentType}
                />
            </View>
            <View style={{ margin: 10 }}>
            <Pressable onPress={() => onPressFocusedEntry()} style={styles.iconContainer}>
                <WatchlistButton
                    inWatchlist={focusedEntry.inWatchlist}
                    watchlistLoading={loading}
                    iconStyle={styles.iconsStyle}
                />
            </Pressable>
            </View>
        </>
    )
}


export const styles = StyleSheet.create({
    seriesListContainer: {
        width: '97%',
        marginTop: 10,
    },
    serieEntryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 220,
        marginBottom: 10,
    },
    imageContainer: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        borderRadius: 10,
        padding: 6,
    },
    coverImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        margin: 10,
    },
    detailsContainer: {
        flex: 0.65,
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 3,
        marginLeft: 10,
    },
    logoContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        height: 60,
        aspectRatio: 1
    },
    iconsStyle: {
        height: 35,
        aspectRatio: 495 / 512
    },
    scoreContainer: { 
        flex: 0.4, 
        justifyContent: 'center' 
    },
    iconContainer: { 
        flex: 0.20, 
        justifyContent: 'center', 
        alignItems: 'flex-end' 
    },
})