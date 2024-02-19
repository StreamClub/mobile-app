import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { ContentEntry } from '../entities/ContentListEntry'
import { ContentType } from '../entities/ContentType'
import { ContentListCallbacks } from './Content/ContentListCallbacks'
import { ContentListEntry } from './Content/ContentListEntry'

export type MovieEntry = {
    id: string
    title: string
    poster: string
    available: boolean
    year: string
    score: number
    seen: boolean
    inWatchlist: boolean
}

type MovieListProps = {
    movieList: MovieEntry[]
    callbacks: ContentListCallbacks
}

export const MovieList = (params: MovieListProps) => {
    const movieList = params.movieList
    const contentType = new ContentType('movie')

    // Callbacks calls
    // ------------------------------------------------------------
    const onMoviePress = (movieEntry: ContentEntry) => {
        params.callbacks.onContentPress(movieEntry)
    }
    // ------------------------------------------------------------

    // Render functions
    // ------------------------------------------------------------
    const renderMovieEntry = (movieEntry: MovieEntry, index: number) => {
        return (
            <ContentListEntry
                index={index}
                contentEntry={movieEntry}
                onSeriePress={onMoviePress}
                callbacks={params.callbacks}
                contentType={contentType}
            />
        )
    }
    // ------------------------------------------------------------

    return (
        <ScrollView style={styles.movieListContainer}>
            {movieList.map(renderMovieEntry)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    movieListContainer: {
        width: '97%',
        marginTop: 10,
    },
    movieEntryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 200,
        marginBottom: 10,
    },
    imageContainer: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
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
        aspectRatio: 1,
    },
    iconsStyle: {
        height: 35,
        aspectRatio: 495 / 512,
    },
    scoreContainer: {
        flex: 0.4,
        justifyContent: 'center',
    },
    iconContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
})
