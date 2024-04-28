import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useGetMovie } from '../../apiCalls/movies'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { MovieDetailScreen } from '../../components/MovieDetails/MovieDetailScreen'
import { Stack, useLocalSearchParams } from 'expo-router'
import { colors } from '../../assets'
import { useMovieDetail } from '../../hooks/useMovieDetails'
import { MovieHeader } from '../../components/MovieDetails/MovieHeader'
import { useAppDispatch } from '../../hooks/redux/useAppDispatch'
import { setFocusedEntry } from '../../store/slices/searchContentSlice'


export type MovieDetailsParams = {
    id: string
}

export default function Movie() {
    const { movie, setMovie } = useMovieDetail()
    const params = useLocalSearchParams<MovieDetailsParams>()
    const { loading, getMovie } = useGetMovie()
    const movieId = params.id || ''
    const dispatch = useAppDispatch();

    const onSuccess = (response: any) => {
        const movie = response.data
        setMovie(movie)
        dispatch(setFocusedEntry({id: movie.id, seen: movie.seen, inWatchlist: movie.inWatchlist}))
    }

    useEffect(() => {
        getMovie(movieId, onSuccess)
    }, [])

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerRight: () => <MovieHeader movie={movie} setMovie={setMovie}/>,
                }}
            />
            {movie && !loading ? (
                <MovieDetailScreen movie={movie} />
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
