import React from 'react'
import { FlatList, ScrollView, StyleSheet } from 'react-native'
import { ContentType } from '../entities/ContentType'
import { ContentListEntry } from './Content/ContentListEntry'
import { MovieEntry } from '../entities/MovieListEntry'
import { useSearchContent } from '../hooks/search/useSearchContent'

type MovieListProps = {
    movieList: MovieEntry[]
}

export const MovieList = (params: MovieListProps) => {
    const movieList = params.movieList
    const contentType = new ContentType('movie')
    const { searchTextPage } = useSearchContent()

    // Render functions
    // ------------------------------------------------------------
    const renderMovieEntry = (movieEntry: MovieEntry, index: number) => {
        return (
            <ContentListEntry
                key={index}
                contentEntry={movieEntry}
                contentType={contentType}
            />
        )
    }
    // ------------------------------------------------------------

    return (
        <FlatList 
            style={styles.movieListContainer}
            data={movieList}
            renderItem={({item, index}) => renderMovieEntry(item, index)}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0}
            onEndReached={searchTextPage}
        />
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
