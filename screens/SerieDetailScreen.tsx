import React, {useState} from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Image, ScrollView, LayoutChangeEvent, Pressable } from 'react-native';
import { Icon, Chip } from 'react-native-paper';
import { TitleText } from '../components/BasicComponents/TitleText';
import { BodyText } from '../components/BasicComponents/BodyText';
import { CustomButton } from '../components/BasicComponents/CustomButton';
import { colors } from "../assets";
import { Actor, CastList } from '../components/CastList';
import { Content, RecommendsList } from '../components/RecomendsList';
import { Platform } from '../components/Types/Platforms';
import { SeriesPlatforms } from '../components/SeriesDetails/SeriesPlatforms';
import { NextEpisode } from '../components/SeriesDetails/NextEpisode';

const screenWidth = Dimensions.get('window').width;

export type Season = {
    id: number,
    seriesId: number,
    name: string,
    poster: string,
    airDate: Date
}

type Episode = {
    photo: string,
    airDate: Date,
    name: string
}

type SerieDetails = {
    id: string,
    overview: string,
    poster: string,
    backdrop: string,
    genres: Array<string>,
    platforms: Array<Platform>,
    title: string,
    status: string,
    creators: Array<string>,
    lastAirDate: Date,
    totalEpisodes: number,
    totalSeasons: number,
    releaseDate: Date,
    seasons: Array<Season>,
    nextEpisode: Episode,
    cast: Array<Actor>,
    similar: Array<Content>,
    inWatchlist: boolean
}

type SerieDetailScreenParams = {
    serie: SerieDetails,
    onSeasonPress: (season: Season) => void;
    onRecommendPress: (series: Content) => void;
}

const renderBackgroundImage = (params: SerieDetailScreenParams) => {
    const [titleTextHeight, setTitleTextHeight] = useState(0);
    
    const handleTitleTextLayout = (event: LayoutChangeEvent) => {
        setTitleTextHeight(event.nativeEvent.layout.height);
    };

    const releaseYear = params.serie.releaseDate? params.serie.releaseDate.getFullYear() : " ? ";
    const lastYear = params.serie.lastAirDate? params.serie.lastAirDate.getFullYear() : " ? ";

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
                {(params.serie.status === 'Finalizada' || params.serie.status === 'Cancelada')?
                <TitleText 
                    body={"(" + releaseYear + ' - ' + (lastYear? lastYear : " ? ") + ")"} 
                    size='big' 
                    style={{width: screenWidth - 10, fontWeight: 'bold'}} /> : null}
                {params.serie.status === 'Serie en emisión'?
                <TitleText 
                    body={"(" + (releaseYear? releaseYear : " ? ") + ' - Presente)'} 
                    size='big' 
                    style={{width: screenWidth - 10, fontWeight: 'bold'}}/> : null}
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

const renderSeasons = (params: SerieDetailScreenParams) => {
    const seasons = params.serie.seasons;
    return(
        <View style={styles.seasons}>
            {seasons ? 
            <>
                <TitleText body='Temporadas:' style={{fontWeight: 'bold'}}/>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    {seasons.map( (season, index) => 
                        <View style={{flexDirection: 'column', margin: 5}} key={index}>
                            <Pressable onPress={() => params.onSeasonPress(season)}>
                                <Image 
                                    source={{ uri: "https://image.tmdb.org/t/p/original" + season.poster }} 
                                    style={styles.seasonImage}
                                />
                            </Pressable>
                            <BodyText body={season.name} size='big' style={{width: 150}} numberOfLines={2}/>
                            <BodyText body={season.airDate.getFullYear().toString()} size='medium' color={colors.primaryGrey} style={{fontWeight: 'bold'}}/>
                        </View>
                    )}
                </ScrollView>
            </> : null
            }
        </View>
    )
}

/* const renderNextEpisode = (episode: Episode) => {
    const formatter = new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <View style={styles.nextEpisode} >
            <Image 
                source={{ uri: "https://image.tmdb.org/t/p/original" + episode.photo }} 
                style={styles.episodePhoto} /> 
            <View style={{flexDirection: 'column', width: 180}}>
                <BodyText body='Próximo capitulo: ' style={{fontWeight: 'bold'}} size='medium'/>
                <BodyText body={episode.name} size='medium' numberOfLines={1}/>
                <BodyText body={formatter.format(episode.airDate)} color={colors.primaryGrey} style={{fontWeight: 'bold'}}/>
                <View style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', flex: 1 }}>
                    <CustomButton 
                        buttonText="Ver ahora" 
                        fontSize='small'
                        type='primary' 
                        onPress={() => console.log("Que buena serie estoy viendo")} 
                        icon="play"
                        style={{width: 120, margin: 10}}/>
                </View>
            </View>
        </View>
    )
} */

export const SerieDetailScreen = (params: SerieDetailScreenParams) => {
    return (
        <ScrollView>
        <View style={styles.container}>
            {renderBackgroundImage(params)}
            <SeriesPlatforms platforms={params.serie.platforms} status={params.serie.status} />
            <NextEpisode episode={params.serie.nextEpisode} platforms={params.serie.platforms}/>
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
            <CastList cast={params.serie.cast} style={styles.cast} />
            <RecommendsList 
                onRecommendPress={params.onRecommendPress} 
                title='Series similares:'
                contents={params.serie.similar} 
                style={styles.recommends} />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    recommends: {
        marginLeft: 20,
        marginBottom: 20
    },
    cast: {
        marginLeft: 20,
        marginBottom: 20
    },
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
        width: 180,
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
