import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useSession } from '../../context/ctx';
import { useState, useEffect } from "react";
import { colors } from "../../assets";
import { getMovie } from '../../apiCalls/movies';
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent';
import { MovieDetailScreen } from '../../screens/MovieDetailScreen';

export default function Movie() {
    const session = useSession();
    const accessToken = session?.accessToken
    const [movie, setMovie] = useState({
        title: '',
        genres: [''],
        poster: '',
        releaseDate: new Date(),
        directors: [''],
        backdrop: ''
    })
    const [movieLoaded, setMovieLoaded] = useState(false)
    const movieId = '24' //DE KILL BILL CAMBIAR CUANDO SE HAGA LA NAVEGACION


    const onSuccess = (response: any) => {
        const movieData = {
            title: response.data.title,
            genres: response.data.genres,
            poster: response.data.poster,
            releaseDate: new Date(response.data.releaseDate),
            //platforms: Array<Platform>,
            directors: response.data.directors,
            backdrop: response.data.backdrop
        }
        setMovie(movieData);
        setMovieLoaded(true);
    }

    const onFailure = (error: any) => {
        console.log(error);
        console.log(error.description);
    }

    useEffect(() => {
        const loadMovie = async () => {
          await getMovie(movieId, onSuccess, onFailure)
        };
        loadMovie();
    }, []);

    return (
        <View style={styles.container}>
            {movieLoaded ? 
                <MovieDetailScreen movie={movie} /> : 
                <LoadingComponent />
            }
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
});