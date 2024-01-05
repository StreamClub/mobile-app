import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Image } from 'react-native';
import { Icon } from 'react-native-paper';
import { TitleText } from '../components/BasicComponents/TitleText';
import { BodyText } from '../components/BasicComponents/BodyText';
const screenWidth = Dimensions.get('window').width;

type MovieDetails = {
    title: string,
    genres: Array<string>,
    poster: string,
    releaseDate: Date,
    platforms: Array<string>,
    directors: Array<string>,
    backdrop: string,
    runtime: string
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
                <View style={styles.director}>
                    <Icon source="movie-open-outline" size={20}/>
                    <BodyText body={' ' + params.movie.directors[0]} size='big'/>
                </View>
                <View style={styles.runtime}>
                    <Icon source="timer-outline" size={20}/>
                    <BodyText body={' ' + params.movie.runtime + ' min'} size='big'/>
                </View>
                <View style={styles.imageOverlay}>
                    <Image 
                        source={{ uri: "https://image.tmdb.org/t/p/original" + params.movie.poster }}
                        style={styles.posterImage}   
                    />
                </View>
            </ImageBackground>
            <View style={styles.platforms}>
                <BodyText body={"Disponible en:"} size="big"/>
                <View style={{flexDirection: 'row'}}>
                    {params.movie.platforms.map( platform => 
                        <Image 
                            source={{ uri: "https://image.tmdb.org/t/p/original" + platform }} 
                            style={styles.platformImage} />
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backdropImage: {
        width: screenWidth,
        height: 180
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
        height: 180
    },
    director: {
        position: 'absolute',
        top: 90,
        alignSelf: 'flex-start',
        marginLeft: 10,
        flexDirection: 'row'
    },
    runtime: {
        position: 'absolute',
        top: 125,
        alignSelf: 'flex-start',
        marginLeft: 10,
        flexDirection: 'row'
    },
    platforms: {
        margin: 20
    },
    platformImage: {
        width: 50,
        height: 50,
        margin: 5,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
    }
});
