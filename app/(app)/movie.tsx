import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { getMovie } from '../../apiCalls/movies'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { MovieDetailScreen } from '../../screens/MovieDetailScreen'

import { Stack, router, useLocalSearchParams } from 'expo-router'
import { Content } from '../../components/RecomendsList'
import { colors } from '../../assets'
import { useMovieDetail } from '../../hooks/useMovieDetails'
import { MovieHeader } from '../../components/MovieDetails/MovieHeader'

export type MovieDetailsParams = {
    id: string
}

export default function Movie() {
    const session = useSession()
    const {movie, setMovie} = useMovieDetail()
    const params = useLocalSearchParams<MovieDetailsParams>()
    const [movieLoaded, setMovieLoaded] = useState(false)
    const movieId = params.id

    const onSuccess = (response: any) => {
        console.log('responseMovie ' + response.data.title);
        setMovie(response.data);
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
                        <MovieHeader movie={movie}/>
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
})
