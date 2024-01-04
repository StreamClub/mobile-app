import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Image } from 'react-native';
import { TitleText } from '../components/BasicComponents/TitleText';
const screenWidth = Dimensions.get('window').width;

type Platform = {
    logo: string,
    name: string
}

type MovieDetails = {
    title: string,
    genres: Array<string>,
    poster: string,
    releaseDate: Date,
    //platforms: Array<Platform>,
    directors: Array<string>,
    backdrop: string
}

type MovieDetailScreenParams = {
    movie: MovieDetails
}

export const MovieDetailScreen = (params: MovieDetailScreenParams) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: "https://image.tmdb.org/t/p/original" + params.movie.backdrop }} 
                style={styles.backdropImage}
                resizeMode="cover"
            >
                <View style={styles.darkness} />
                <View style={styles.textOverlay}>
                    <TitleText body={params.movie.title + '(' + params.movie.releaseDate.getFullYear() + ')'} size='big'/>
                </View>
                <View style={styles.imageOverlay}>
                    <Image 
                        source={{ uri: "https://image.tmdb.org/t/p/original" + params.movie.poster }}
                        style={styles.posterImage}   
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backdropImage: {
        width: screenWidth,
        height: 200
    },
    textOverlay: {
        position: 'absolute',
        top: 30,
        alignSelf: 'center',
    },
    imageOverlay: {
        position: 'absolute',
        top: 90,
        alignSelf: 'flex-end'
    },
    posterImage: {
        width: 170,
        height: 255,
        marginRight: 10,
        borderWidth: 2,
        borderColor: 'black',
    },
    darkness: {
        backgroundColor: '#C7D6D990',
        width: screenWidth,
        height: 200
    },
});
