import React, {useState} from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Image, ScrollView, LayoutChangeEvent } from 'react-native';
import { Icon, Divider, Chip } from 'react-native-paper';
import { TitleText } from '../components/BasicComponents/TitleText';
import { BodyText } from '../components/BasicComponents/BodyText';
import { CustomButton } from '../components/BasicComponents/CustomButton';
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

const renderBackgroundImage = (params: MovieDetailScreenParams) => {
    const [titleTextHeight, setTitleTextHeight] = useState(0);
    
    const handleTitleTextLayout = (event: LayoutChangeEvent) => {
        setTitleTextHeight(event.nativeEvent.layout.height);
    };

    const backgroundSize = 170 + (titleTextHeight/30 - 2)*30

    return(
        <ImageBackground
                source={{ uri: "https://image.tmdb.org/t/p/original" + params.movie.backdrop }} 
                style={[styles.backdropImage, {height: backgroundSize}]}
                resizeMode="cover"
            >
            <View style={[styles.darkness, {height: backgroundSize}]} />
            <View style={styles.textOverlay}>
                <TitleText
                    body={params.movie.title + ' (' + params.movie.releaseDate.getFullYear() + ')'} 
                    size='big' 
                    style={{width: screenWidth - 10, fontWeight: 'bold'}} 
                    onLayout={handleTitleTextLayout}
                />
            </View>
            <View style={[styles.director, {top: backgroundSize - 80}]}>
                <Icon source="movie-open-outline" size={20} />
                <BodyText body={' ' + params.movie.directors[0]} size='big' style={{fontWeight: 'bold'}} />
            </View>
            <View style={[styles.runtime, {top: backgroundSize - 45}]}>
                <Icon source="timer-outline" size={20}/>
                <BodyText body={' ' + params.movie.runtime + ' min'} size='big' style={{fontWeight: 'bold'}} />
            </View>
            <View style={[styles.imageOverlay, {top: backgroundSize - 90}]}>
                <Image 
                    source={{ uri: "https://image.tmdb.org/t/p/original" + params.movie.poster }}
                    style={styles.posterImage}   
                />
            </View>
        </ImageBackground>
    )
}

const renderPlatforms = (params: MovieDetailScreenParams) => {
    console.log(params.movie.platforms.length === 0)
    return(
    <View style={styles.platforms}>
        {(params.movie.platforms.length === 1)?
            <>
                <BodyText body={"Disponible en:"} size="big"/>
                <View style={{height: 'auto', width: 180, alignItems: 'center'}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}> 
                        {params.movie.platforms.map( (platform, index) => 
                            <Image 
                                source={{ uri: "https://image.tmdb.org/t/p/original" + platform }} 
                                style={styles.platformImage}
                                key={index} />
                        )} 
                    </ScrollView>
                    <Divider style={styles.divider} />
                    <View style={styles.buttom}>
                        <CustomButton 
                            buttonText="Ver ahora" 
                            buttonSize='medium'
                            fontSize='medium'
                            type='primary' 
                            onPress={() => console.log("Que buena peli estoy viendo")} 
                            icon="play"/>
                    </View>
                </View>
            </> : 
            <BodyText size='big' color={colors.primaryRed} body='No disponible en ninguna plataforma.' style={{width: 160, margin: 10}} />    
        }
    </View>
    )
}

export const MovieDetailScreen = (params: MovieDetailScreenParams) => {
    return (
        <ScrollView>
        <View style={styles.container}>
            {renderBackgroundImage(params)}
            {renderPlatforms(params)}
            <View style={styles.description}>
                <BodyText body={params.movie.overview} />
                <View style={{height: 60}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                        {params.movie.genres.map((genre, index) => 
                            <Chip 
                                key={index} 
                                style={{margin: 10, backgroundColor: 'transparent', borderColor: colors.primaryBlack, height: 40}}
                                mode="outlined"
                                textStyle={{ color: colors.primaryBlack }}>
                                    {genre}
                            </Chip>
                        )}
                    </ScrollView>
                </View>
            </View>
        </View>
        </ScrollView>
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
        top: 10,
        left: 5,
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
        borderColor: colors.primaryBlack,
    },
    darkness: {
        backgroundColor: colors.secondaryWhite + '85',
        width: screenWidth
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
        marginTop: 5,
        height: 160,
        justifyContent: 'center'
    },
    platformImage: {
        width: 50,
        height: 50,
        margin: 5,
        borderWidth: 2,
        borderColor: colors.primaryBlack,
        borderRadius: 10,
    },
    divider: {
        backgroundColor: colors.primaryBlack,
        width: 150,
        height: 1,
        margin: 10,
    },
    buttom: {
        marginTop: 20
    },
    description: {
        margin: 20,
        flex: 1,
        alignItems: 'center'
    }
});
