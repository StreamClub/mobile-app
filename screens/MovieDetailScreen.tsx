import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Image } from 'react-native';
import { Icon, Divider, Chip } from 'react-native-paper';
import { TitleText } from '../components/BasicComponents/TitleText';
import { BodyText } from '../components/BasicComponents/BodyText';
import { PrimaryButton } from '../components/BasicComponents/PrimaryButton';
import { colors } from "../assets";

const screenWidth = Dimensions.get('window').width;

type MovieDetails = {
    title: string,
    genres: Array<string>,
    poster: string,
    releaseDate: Date,
    platforms: Array<string>,
    directors: Array<string>,
    backdrop: string,
    runtime: string,
    overview: string
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
                    {params.movie.platforms.map( (platform, index) => 
                        <Image 
                            source={{ uri: "https://image.tmdb.org/t/p/original" + platform }} 
                            style={styles.platformImage}
                            key={index} />
                    )}
                </View>
                <Divider style={styles.divider} />
            </View>
            <View style={styles.buttom}>
                <PrimaryButton 
                    buttonText="Ver ahora" 
                    size='medium' 
                    onPress={() => console.log("Que buena peli estoy viendo")} 
                    icon="play"/>
            </View>
            <View style={styles.description}>
                <BodyText body={params.movie.overview} />
                <View style={{flexDirection: 'row'}}>
                    {params.movie.genres.map((genre, index) => 
                        <Chip 
                            key={index} 
                            style={{margin: 10, backgroundColor: 'transparent', borderColor: 'black'}}
                            mode="outlined"
                            textStyle={{ color: 'black' }}>
                                {genre}
                        </Chip>
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
        height: 170
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
        backgroundColor: colors.secondaryWhite + '90',
        width: screenWidth,
        height: 170
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
        marginLeft: 20,
        marginTop: 5
    },
    platformImage: {
        width: 50,
        height: 50,
        margin: 5,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
    },
    divider: {
        backgroundColor: 'black',
        width: 150,
        height: 1,
        margin: 10,
    },
    buttom: {
        marginLeft: 25,
        marginTop: 20
    },
    description: {
        margin: 20,
        flex: 1,
        alignItems: 'center'
    }
});
