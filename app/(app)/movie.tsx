import { View, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { getMovie } from '../../apiCalls/movies'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { MovieDetailScreen } from '../../screens/MovieDetailScreen'

import { Stack, router, useLocalSearchParams } from 'expo-router'
import { Content } from '../../components/RecomendsList'
import { IconButton } from 'react-native-paper'
import { handleMovieWatchlistPress } from '../../utils/handleWatchlistPress'
import { colors } from '../../assets'
import { WatchlistButton } from '../../components/BasicComponents/WatchlistButton'
import { useMovieDetail } from '../../hooks/useMovieDetails'

export type MovieDetailsParams = {
    id: string
}

export default function Movie() {
    const session = useSession()
    const {movie, setMovie} = useMovieDetail()
    const params = useLocalSearchParams<MovieDetailsParams>()
    const [movieLoaded, setMovieLoaded] = useState(false)
    const [inWatchlist, setInWatchlist] = useState(movie? movie.inWatchlist : false)
    const [loading, setLoading] = useState(false)
    const movieId = params.id

    const onSuccess = (response: any) => {
        console.log('responseMovie ' + response.data.title);
        setMovie(response.data);
        console.log(movie);
        setInWatchlist(movie? movie.inWatchlist : false);
        setMovieLoaded(true);
    }

    const onFailure = (error: any) => {
        console.log(error)
    }

    useEffect(() => {
        const loadMovie = async () => {
            await getMovie(session, movieId, onSuccess, onFailure)
        }
        loadMovie()
    }, [])

    const onRedommendedPress = (movie: Content) => {
        const newParams: MovieDetailsParams = {
            id: movie.id.toString(),
        }
        router.replace({ pathname: '/movie', params: newParams })
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <>
                            <IconButton
                                onPress={() => console.log('hola')}
                                icon="plus-circle-outline"
                                size={40}
                            />
                            <Pressable
                                onPress={() => movie?
                                    handleMovieWatchlistPress(
                                        movie.id,
                                        setLoading,
                                        setInWatchlist,
                                        inWatchlist,
                                        session
                                    ) : console.log("Movie not loaded")
                                }
                            >
                                <WatchlistButton
                                    iconStyle={styles.iconsStyle}
                                    watchlistLoading={loading}
                                    inWatchlist={inWatchlist}
                                />
                            </Pressable>
                        </>
                    ),
                }}
            />
            {movie && movieLoaded ? (
                <MovieDetailScreen
                    movie={movie}
                    onRecommendPress={onRedommendedPress}
                />
            ) : (
                <LoadingComponent />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondaryWhite,
    },
    iconsStyle: {
        height: 35,
        aspectRatio: 495 / 512,
    },
})
