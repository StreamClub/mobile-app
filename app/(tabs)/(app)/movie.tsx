import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useGetMovie } from '../../../apiCalls/movies'
import { LoadingComponent } from '../../../components/BasicComponents/LoadingComponent'
import { MovieDetailScreen } from '../../../components/MovieDetails/MovieDetailScreen'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { Content } from '../../../components/RecommendsList'
import { colors } from '../../../assets'
import { useMovieDetail } from '../../../hooks/useMovieDetails'
import { MovieHeader } from '../../../components/MovieDetails/MovieHeader'
import { ContentType } from '../../../components/Types/ContentType'

export type MovieDetailsParams = {
    id: string
}

export default function Movie() {
    const {movie, setMovie} = useMovieDetail()
    const params = useLocalSearchParams<MovieDetailsParams>()
    const {loading, getMovie} = useGetMovie();
    const movieId = params.id

    const onSuccess = (response: any) => {
        console.log('responseMovie ' + response.data.title);
        setMovie(response.data);
    }

    useEffect(() => {
        const loadMovie = async () => {
            await getMovie(movieId, onSuccess);
        }
        loadMovie()
    }, [])

    const onRedommendedPress = (movie: Content) => {
        const newParams: MovieDetailsParams = {
            id: movie.id.toString(),
        }
        router.replace({ pathname: '/movie', params: newParams })
    }

    const onPressFullCredits = () => {
        router.push({ pathname: '/credits', params: { contentId: movieId, contentType: ContentType.Movie} })
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
            {movie && !loading ? (
                <MovieDetailScreen
                    movie={movie}
                    onRecommendPress={onRedommendedPress}
                    onPressFullCredits={onPressFullCredits}
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
