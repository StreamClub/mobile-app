import React, {useState} from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Image, ScrollView, LayoutChangeEvent } from 'react-native';
import { Icon, Divider, Chip } from 'react-native-paper';
import { TitleText } from '../components/BasicComponents/TitleText';
import { BodyText } from '../components/BasicComponents/BodyText';
import { CustomButton } from '../components/BasicComponents/CustomButton';
import { colors } from "../assets";

const screenWidth = Dimensions.get('window').width;

export type Season = {
    id: number,
    name: string,
    poster: string,
    airDate: Date
}

type SerieDetails = {
    overview: string,
    poster: string,
    backdrop: string,
    genres: Array<string>,
    platforms: Array<string>,
    title: string,
    status: string,
    creators: Array<string>,
    lastAirDate: Date,
    totalEpisodes: number,
    totalSeasons: number,
    releaseDate: Date,
    seasons: Array<Season>
}

type SerieDetailScreenParams = {
    serie: SerieDetails
}

const renderBackgroundImage = (params: SerieDetailScreenParams) => {
    const [titleTextHeight, setTitleTextHeight] = useState(0);
    
    const handleTitleTextLayout = (event: LayoutChangeEvent) => {
        setTitleTextHeight(event.nativeEvent.layout.height);
    };

    const backgroundSize = 210 + (titleTextHeight/30 - 2)*30

    return(
        <ImageBackground
                source={{ uri: "https://image.tmdb.org/t/p/original" + params.serie.backdrop }} 
                style={[styles.backdropImage, {height: backgroundSize}]}
                resizeMode="cover"
            >
            {params.serie.backdrop?
                <View style={[styles.darkness, {height: backgroundSize}]} /> :
                <View style={[styles.darkness, {height: backgroundSize, backgroundColor: colors.primarySkyBlue + '85'}]} />
            }
            <View style={styles.textOverlay}>
                <TitleText
                    body={params.serie.title} 
                    size='big' 
                    style={{width: screenWidth - 10, fontWeight: 'bold'}} 
                    onLayout={handleTitleTextLayout}
                />
                <TitleText
                    body={
                        '(' + (params.serie.releaseDate.getFullYear()? params.serie.releaseDate.getFullYear(): ' ? ') + 
                        ' - ' + (params.serie.releaseDate.getFullYear()? params.serie.lastAirDate.getFullYear(): ' ? ') + ')'} 
                    size='big' 
                    style={{width: screenWidth - 10, fontWeight: 'bold'}}
                />
                <BodyText body={'Cant. espisodios: ' + params.serie.totalEpisodes} size='medium' style={{fontWeight: 'bold'}} />
                <BodyText body={'Cant. temporadas: ' + params.serie.totalSeasons} size='medium' style={{fontWeight: 'bold'}} />
                <BodyText body={'Creador: ' + params.serie.creators[0]} size='medium' style={{fontWeight: 'bold'}} />
            </View>
            <View style={[styles.imageOverlay, {top: backgroundSize - 90}]}>
                {params.serie.poster?
                    <Image 
                        source={{ uri: "https://image.tmdb.org/t/p/original" + params.serie.poster }}
                        style={styles.posterImage}   
                    /> :
                    <View style={[styles.posterImage, {backgroundColor: colors.primarySkyBlue, alignItems: 'center', justifyContent: 'center'}]}>
                        <Icon source="image-off-outline" size={90}/>
                    </View>
                }
            </View>
        </ImageBackground>
    )
}

const renderPlatforms = (params: SerieDetailScreenParams) => {
    return(
    <View style={styles.platforms}>
        {(params.serie.platforms.length >= 1)?
            <>
                <BodyText body={"Disponible en:"} size="big"/>
                <View style={{height: 'auto', width: 180, alignItems: 'center'}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}> 
                        {params.serie.platforms.map( (platform, index) => 
                            <Image 
                                source={{ uri: "https://image.tmdb.org/t/p/original" + platform }} 
                                style={styles.platformImage}
                                key={index} />
                        )} 
                    </ScrollView>
                    <Divider style={styles.divider} />
                    <BodyText body={'Estado: ' + params.serie.status} size='big' color={colors.primaryBlue} style={{fontWeight: 'bold'}}/>
                </View>
            </> : 
            <BodyText size='big' color={colors.primaryRed} body='No disponible en ninguna plataforma.' style={{width: 160, margin: 10}} />    
        }
    </View>
    )
}

const renderSeasons = (params: SerieDetailScreenParams) => {
    const seasons = params.serie.seasons;
    return(
        <View style={styles.seasons}>
            {seasons ? 
            <>
                <TitleText body='Temporadas:' style={{fontWeight: 'bold'}}/>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    {seasons.map( (season, index) => 
                        <View style={{flexDirection: 'column', margin: 5}}>
                            <Image 
                                source={{ uri: "https://image.tmdb.org/t/p/original" + season.poster }} 
                                style={styles.seasonImage}
                                key={index} /> 
                            <BodyText body={season.name} size='big' />
                            <BodyText body={season.airDate.getFullYear().toString()} size='medium' color={colors.primaryGrey} style={{fontWeight: 'bold'}}/>
                        </View>
                    )}
                </ScrollView>
            </> : null
            }
        </View>
    )
}

export const SerieDetailScreen = (params: SerieDetailScreenParams) => {
    return (
        <ScrollView>
        <View style={styles.container}>
            {renderBackgroundImage(params)}
            {renderPlatforms(params)}
            <View style={styles.description}>
                <BodyText body={params.serie.overview} />
                <View style={{height: 60}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                        {params.serie.genres.map((genre, index) => 
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
            {renderSeasons(params)}
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
        height: 210
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
    },
    seasons: {
        marginLeft: 20,
        marginBottom: 20
    },
    seasonImage: {
        width: 150,
        height: 230,
        borderRadius: 20
    }
});
