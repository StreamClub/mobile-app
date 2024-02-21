import { View, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { getMovie } from '../../apiCalls/movies'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { MovieDetailScreen } from '../../screens/MovieDetailScreen'

import { Stack, router, useLocalSearchParams } from 'expo-router'
import { Actor } from '../../components/CastList'
import { Content } from '../../components/RecomendsList'
import { IconButton } from 'react-native-paper'
import { handleMovieWatchlistPress } from '../../utils/handleWatchlistPress'
import { colors } from '../../assets'
import { WatchlistButton } from '../../components/BasicComponents/WatchlistButton'

export type MovieDetailsParams = {
    id: string
}

export default function Movie() {
    const session = useSession()
    const [movie, setMovie] = useState({
        id: '',
        title: '',
        genres: [''],
        poster: '',
        releaseDate: new Date(),
        directors: [''],
        backdrop: '',
        runtime: '',
        platforms: [''],
        overview: '',
        cast: [],
        similar: [],
        inWatchlist: false,
    })
    const params = useLocalSearchParams<MovieDetailsParams>()
    const [movieLoaded, setMovieLoaded] = useState(false)
    const [inWatchlist, setInWatchlist] = useState(movie.inWatchlist)
    const [loading, setLoading] = useState(false)
    const movieId = params.id

    const onSuccess = (response: any) => {
        const platforms = response.data.platforms
        const cast = response.data.cast
        const similar = response.data.similar
        console.log('responseMovie ' + response.data.title)
        const movieData = {
            id: String(response.data.id),
            title: response.data.title,
            genres: response.data.genres,
            poster: response.data.poster,
            releaseDate: new Date(response.data.releaseDate),
            platforms: platforms
                ? platforms.map((platform: any) => platform.logoPath)
                : [],
            directors: response.data.directors,
            backdrop: response.data.backdrop,
            runtime: String(response.data.runtime),
            overview: response.data.overview,
            cast: cast
                ? cast.map((actor: Actor) => ({
                      name: actor.name,
                      profilePath: actor.profilePath,
                      character: actor.character,
                  }))
                : [],
            similar: similar
                ? similar.map((movie: Content) => ({
                      id: movie.id,
                      title: movie.title,
                      posterPath: movie.posterPath,
                      releaseDate: new Date(movie.releaseDate),
                  }))
                : [],
            inWatchlist: response.data.inWatchlist,
        }
        setMovie(movieData)
        setInWatchlist(movieData.inWatchlist)
        setMovieLoaded(true)
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
                                onPress={() =>
                                    handleMovieWatchlistPress(
                                        movie.id,
                                        setLoading,
                                        setInWatchlist,
                                        inWatchlist,
                                        session
                                    )
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
            {movieLoaded ? (
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
