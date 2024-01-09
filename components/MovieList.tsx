import React from 'react'
import { ScrollView, View, Text, Image, StyleSheet, Pressable} from 'react-native'
import { BodyText } from './BasicComponents/BodyText'
import { TitleText } from './BasicComponents/TitleText'
import { colors } from '../assets/styles/colors'

const MAX_TITLE_LENGHT = 62

export type MovieEntry = {
    title: string,
    cover: string,
    available: boolean,
    year: string,
    score: number,
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
        if (movieEntry.title.length > MAX_TITLE_LENGHT) {
            movieEntry.title = movieEntry.title.slice(0, MAX_TITLE_LENGHT) + '...'
        }

        const availableText = movieEntry.available? "Disponible en tus plataformas" : ""
        const scoreFormatted = movieEntry.score.toString() + "/10"

        return (
            <View
                style={styles.detailsContainer}
            >
                <View style={{flex: 0.6, backgroundColor: 'yellow'}}>
                    <TitleText body={movieEntry.title} size='small' style={styles.movieTitle}/>
                    <TitleText body={"(" + movieEntry.year + ")"} size='small'/>
                </View>
                <View style={{flex: 0.15, backgroundColor: 'green'}}>
                    <BodyText body={availableText} size='medium' fontStyle='italic' color={colors.secondaryBlue}/>
                </View>
                <View style={{flex: 0.25, backgroundColor: 'violet', flexDirection: 'row', width: '100%'}}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={styles.logoStyle}
                        />
                    </View>
                    <View style={{flex: 0.3, backgroundColor: 'brown', justifyContent: 'center'}}>
                        <BodyText body={scoreFormatted} size='big'/>
                    </View>
                    <View style={{flex: 0.25, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Pressable onPress={() => console.log("press")}>
                        <Image
                            source={require('../assets/icons/unmarkAsSeen.png')}
                            style={styles.iconsStyle}
                        />
                        </Pressable>
                    </View>
                    <View style={{flex: 0.25, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'flex-end'}}>
                        <Pressable onPress={() => console.log("press2")}>
                        <Image
                            source={require('../assets/icons/removeFromWatchlist.png')}
                            style={styles.iconsStyle}
                        />
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }

    const renderMovieEntry = (movieEntry: MovieEntry, index: number) => {
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
            style={styles.movieListContainer}
        >
            {movieList.map(renderMovieEntry)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    movieListContainer: {
        width: '97%',
        backgroundColor: 'white',
        marginTop: 10,
    },
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
    },
    detailsContainer: {
        flex: 0.65,
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'red',
        padding: 3,
    },
    movieTitle: {
        backgroundColor: 'blue',
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
        height: 40,
        aspectRatio: 495/512
    }
})