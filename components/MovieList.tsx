import React from 'react'
import { ScrollView, View, Text, Image, StyleSheet, Pressable, ImageSourcePropType } from 'react-native'
import { BodyText } from './BasicComponents/BodyText'
import { TitleText } from './BasicComponents/TitleText'
import { colors } from '../assets/styles/colors'

const MAX_TITLE_LENGHT = 50

export type MovieEntry = {
    title: string,
    cover: string,
    available: boolean,
    year: string,
    score: number,
    seen: boolean,
    inWatchlist: boolean,
}

type MovieListProps = {
    movieList: MovieEntry[],
}

export const MovieList = (params: MovieListProps) => {
    const movieList = params.movieList

    const renderCoverSection = (movieEntry: MovieEntry) => {
        const coverOutlineStyle = { backgroundColor: movieEntry.available ? colors.secondaryBlue : 'transparent' }

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

    const renderTitle = (title: string, year: string) => {
        return (
            <View style={{flex: 0.6,}}>
                <TitleText body={title} size='small'/>
                <TitleText body={"(" + year + ")"} size='small'/>
            </View>
        )
    }

    const renderAvailableText = (availableText: string) => {
        return (
            <View style={{flex: 0.15}}>
                <BodyText body={availableText} size='medium' fontStyle='italic' color={colors.secondaryBlue}/>
            </View>
        )
    }

    const renderBottomSection = (scoreFormatted: string, seenIcon: ImageSourcePropType, watchlistIcon: ImageSourcePropType) => {
        return (
            <View style={{flex: 0.25, flexDirection: 'row', width: '100%'}}>
                
                {/* Section that render StreamClub logo */}
                {/* ------------------------------------------------------------ */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.logoStyle}
                    />
                </View>
                {/* ------------------------------------------------------------ */}

                {/* Section that render content score */}
                {/* ------------------------------------------------------------ */}
                <View style={{flex: 0.3, justifyContent: 'center'}}>
                    <BodyText body={scoreFormatted} size='big'/>
                </View>
                {/* ------------------------------------------------------------ */}

                {/* Section that render watchlist and seen buttons */}
                {/* ------------------------------------------------------------ */}
                <Pressable onPress={() => console.log("press")} style={{flex: 0.25, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Image
                        source={seenIcon}
                        style={styles.iconsStyle}
                    />
                </Pressable>
                <Pressable onPress={() => console.log("press2")} style={{flex: 0.25, justifyContent: 'center', alignItems: 'flex-end'}}>
                    <Image
                        source={watchlistIcon}
                        style={styles.iconsStyle}
                    />
                </Pressable>
                {/* ------------------------------------------------------------ */}
            </View>
        )
    }

    const renderDetailsSection = (movieEntry: MovieEntry) => {
        if (movieEntry.title.length > MAX_TITLE_LENGHT) {
            movieEntry.title = movieEntry.title.slice(0, MAX_TITLE_LENGHT).trim() + '...'
        }

        const availableText = movieEntry.available? "Disponible en tus plataformas" : ""
        const scoreFormatted = movieEntry.score.toString() + "/10"
        const seenIcon = movieEntry.seen? require('../assets/icons/unmarkAsSeen.png') : require('../assets/icons/markAsSeen.png')
        const watchlistIcon = movieEntry.inWatchlist? require('../assets/icons/removeFromWatchlist.png') : require('../assets/icons/addToWatchlist.png')


        return (
            <Pressable onPress={() => console.log("asd")} style={styles.detailsContainer}>
                {renderTitle(movieEntry.title, movieEntry.year)}

                {renderAvailableText(availableText)}
                
                {renderBottomSection(scoreFormatted, seenIcon, watchlistIcon)}
            </Pressable>
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
        height: 40,
        aspectRatio: 495/512
    }
})