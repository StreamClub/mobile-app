import React from 'react'
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native'

export type MovieEntry = {
    title: string,
    cover: string,
    available: boolean,
}

type MovieListProps = {
    movieList: MovieEntry[],
}

export const MovieList = (params: MovieListProps) => {
    const movieList = params.movieList

    const renderCoverSection = (movieEntry: MovieEntry) => {
        const coverOutlineStyle = { backgroundColor: movieEntry.available ? '#4193A6' : 'transparent' }

        return (
            <View
                style={[styles.imageContainer, coverOutlineStyle]}
            >
                <Image
                    source={{ uri: "https://image.tmdb.org/t/p/original" + movieEntry.cover }}
                    style={styles.coverImage}
                    resizeMode="contain"
                />
            </View>
        )
    }

    const renderDetailsSection = (movieEntry: MovieEntry) => {
        return (
            <View
                style={{
                    flex: 0.65,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'red',
                }}
            >
                <Text
                    style={{
                        marginLeft: 10,
                        fontSize: 14,
                        fontWeight: 'bold',
                    }}
                >
                    {movieEntry.title}
                </Text>
            </View>
        )
    }

    const renderMovieEntry = (movieEntry: MovieEntry, index: number) => {
        console.log(movieEntry.cover)

        return (
            <View
                key={index}
                style={styles.movieEntryContainer}
            >
                {renderCoverSection(movieEntry)}

                {renderDetailsSection(movieEntry)}
            </View>
        )
    }

    return (
        <ScrollView
            style={{
                width: '97%',
                backgroundColor: 'white',
                marginTop: 10,
            }}
        >
            {movieList.map(renderMovieEntry)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    movieEntryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 200,
        borderWidth: 1,
        marginBottom: 10,
    },
    imageContainer: {
        flex: 0.35,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderRadius: 10,
        padding: 10,
    },
    coverImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        margin: 10,
    }
})