import React from 'react'
import { ScrollView, View, Text, Image, StyleSheet, Pressable, ImageSourcePropType, ActivityIndicator } from 'react-native'
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

export type MovieListCallbacks = {
    onMoviePress: (movie: MovieEntry) => void;
    onSeenPress: (movie: MovieEntry, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
    onWatchlistPress: (movie: MovieEntry, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

type MovieListProps = {
    movieList: MovieEntry[],
    callbacks: MovieListCallbacks,
}

export const MovieList = (params: MovieListProps) => {
    const movieList = params.movieList

    // Callbacks calls
    // ------------------------------------------------------------
    const onMoviePress = (movieEntry: MovieEntry) => {
        params.callbacks.onMoviePress(movieEntry)
    }

    const onSeenPress = (movieEntry: MovieEntry, loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (loading) return
        params.callbacks.onSeenPress(movieEntry, setLoading)
    }

    const onWatchlistPress = (movieEntry: MovieEntry, loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (loading) return
        params.callbacks.onWatchlistPress(movieEntry, setLoading)
    }
    // ------------------------------------------------------------


    // Render functions
    // ------------------------------------------------------------
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

    const renderCoverSection = (movieEntry: MovieEntry) => {
        const coverOutlineStyle = { backgroundColor: movieEntry.available ? colors.secondaryBlue : 'transparent' }

        return (
            <Pressable
                onPress={() => onMoviePress(movieEntry)}
                style={[styles.imageContainer, coverOutlineStyle]}
            >
                <Image
                    source={{ uri: "https://image.tmdb.org/t/p/original" + movieEntry.cover }}
                    style={styles.coverImage}
                    resizeMode="contain"
                />
            </Pressable>
        )
    }

    const renderDetailsSection = (movieEntry: MovieEntry) => {
        let movieTitle = movieEntry.title
        if (movieEntry.title.length > MAX_TITLE_LENGHT) {
            movieTitle = movieEntry.title.slice(0, MAX_TITLE_LENGHT).trim() + '...'
        }

        const availableText = movieEntry.available ? "Disponible en tus plataformas" : ""
        const scoreFormatted = movieEntry.score.toString() + "/10"
        const seenIcon = movieEntry.seen ? require('../assets/icons/unmarkAsSeen.png') : require('../assets/icons/markAsSeen.png')
        const watchlistIcon = movieEntry.inWatchlist ? require('../assets/icons/removeFromWatchlist.png') : require('../assets/icons/addToWatchlist.png')

        return (
            <Pressable onPress={() => onMoviePress(movieEntry)} style={styles.detailsContainer}>
                {renderTitle(movieTitle, movieEntry.year)}

                {renderAvailableText(availableText)}

                {renderBottomSection(movieEntry, scoreFormatted, seenIcon, watchlistIcon)}
            </Pressable>
        )
    }

    const renderTitle = (title: string, year: string) => {
        return (
            <View style={{ flex: 0.6, }}>
                <TitleText body={title} size='small' />
                <TitleText body={"(" + year + ")"} size='small' />
            </View>
        )
    }

    const renderAvailableText = (availableText: string) => {
        return (
            <View style={{ flex: 0.15 }}>
                <BodyText body={availableText} size='medium' fontStyle='italic' color={colors.secondaryBlue} />
            </View>
        )
    }

    const renderBottomSection = (movieEntry: MovieEntry, scoreFormatted: string, seenIcon: ImageSourcePropType, watchlistIcon: ImageSourcePropType) => {
        const [seenLoading, setSeenLoading] = React.useState(false)
        const [watchlistLoading, setWatchlistLoading] = React.useState(false)
        return (
            <View style={{ flex: 0.25, flexDirection: 'row', width: '100%' }}>

                {/* Section that render StreamClub logo */}
                {/* ------------------------------------------------------------ */}
                <Pressable style={styles.logoContainer}>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.logoStyle}
                    />
                </Pressable>
                {/* ------------------------------------------------------------ */}

                {/* Section that render content score */}
                {/* ------------------------------------------------------------ */}
                <Pressable style={styles.scoreContainer}>
                    <BodyText body={scoreFormatted} size='big' />
                </Pressable>
                {/* ------------------------------------------------------------ */}

                {/* Section that render watchlist and seen buttons */}
                {/* ------------------------------------------------------------ */}
                
                {/* Seen Section */}
                <Pressable 
                    onPress={() => onSeenPress(movieEntry, seenLoading, setSeenLoading)} 
                    style={styles.iconContainer}
                >
                    {seenLoading ?
                        <ActivityIndicator size="small" animating={true} color={colors.primaryRed} style={{marginRight: 7}}/>
                        :
                        <Image
                            source={seenIcon}
                            style={styles.iconsStyle}
                        />
                    }
                </Pressable>

                {/* Watchlist Section */}
                <Pressable 
                    onPress={() => onWatchlistPress(movieEntry, watchlistLoading, setWatchlistLoading)} 
                    style={styles.iconContainer}
                >
                    {watchlistLoading ?
                        <ActivityIndicator size="small" animating={true} color={colors.primaryRed} style={{marginRight: 7}}/>
                        :
                        <Image
                            source={watchlistIcon}
                            style={styles.iconsStyle}
                        />
                    }
                </Pressable>
                {/* ------------------------------------------------------------ */}
            </View>
        )
    }
    // ------------------------------------------------------------

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