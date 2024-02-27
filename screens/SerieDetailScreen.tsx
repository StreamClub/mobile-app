import React, {useState} from 'react';
import { View, ImageBackground, StyleSheet, Dimensions, Image, ScrollView, LayoutChangeEvent, Pressable } from 'react-native';
import { Icon, Chip } from 'react-native-paper';
import { TitleText } from '../components/BasicComponents/TitleText';
import { BodyText } from '../components/BasicComponents/BodyText';
import { colors } from "../assets";
import { CastList } from '../components/CastList';
import { Content, RecommendsList } from '../components/RecomendsList';
import { SeriesPlatforms } from '../components/SeriesDetails/SeriesPlatforms';
import { NextEpisode } from '../components/SeriesDetails/NextEpisode';
import { Season } from '../entities/Details/Series/Season';
import { SeriesDetail } from '../entities/Details/Series/SeriesDetailEntry';
import { Platform } from '../entities/Details/Platform';

const screenWidth = Dimensions.get('window').width;

type SerieDetailScreenParams = {
    series: SeriesDetail,
    onSeasonPress: (season: Season, platforms: Platform[]) => void;
    onRecommendPress: (series: Content) => void;
}

const renderBackgroundImage = (params: SerieDetailScreenParams) => {
    const [titleTextHeight, setTitleTextHeight] = useState(0);
    
    const handleTitleTextLayout = (event: LayoutChangeEvent) => {
        setTitleTextHeight(event.nativeEvent.layout.height);
    };

    const releaseYear = params.series.releaseDate? params.series.releaseDate.getFullYear() : " ? ";
    const lastYear = params.series.lastAirDate? params.series.lastAirDate.getFullYear() : " ? ";

    const backgroundSize = 210 + (titleTextHeight/30 - 2)*30

    console.log(params.series.createdBy);

    return(
        <ImageBackground
                source={{ uri: "https://image.tmdb.org/t/p/original" + params.series.backdrop }} 
                style={[styles.backdropImage, {height: backgroundSize}]}
                resizeMode="cover"
            >
            {params.series.backdrop?
                <View style={[styles.darkness, {height: backgroundSize}]} /> :
                <View style={[styles.darkness, {height: backgroundSize, backgroundColor: colors.primarySkyBlue + '85'}]} />
            }
            <View style={styles.textOverlay}>
                <TitleText
                    body={params.series.title} 
                    size='big' 
                    style={{width: screenWidth - 10, fontWeight: 'bold'}} 
                    onLayout={handleTitleTextLayout}
                />
                {(params.series.status === 'Finalizada' || params.series.status === 'Cancelada')?
                <TitleText 
                    body={"(" + releaseYear + ' - ' + (lastYear? lastYear : " ? ") + ")"} 
                    size='big' 
                    style={{width: screenWidth - 10, fontWeight: 'bold'}} /> : null}
                {params.series.status === 'Serie en emisión'?
                <TitleText 
                    body={"(" + (releaseYear? releaseYear : " ? ") + ' - Presente)'} 
                    size='big' 
                    style={{width: screenWidth - 10, fontWeight: 'bold'}}/> : null}
                <BodyText body={'Cant. espisodios: ' + params.series.totalEpisodes} size='medium' style={{fontWeight: 'bold'}} />
                <BodyText body={'Cant. temporadas: ' + params.series.totalSeasons} size='medium' style={{fontWeight: 'bold'}} />
                <BodyText body={'Creador: ' + params.series.createdBy[0]} size='medium' style={{fontWeight: 'bold'}} />
            </View>
            <View style={[styles.imageOverlay, {top: backgroundSize - 90}]}>
                {params.series.poster?
                    <Image 
                        source={{ uri: "https://image.tmdb.org/t/p/original" + params.series.poster }}
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
    const seasons = params.series.seasons;
    return(
        <View style={styles.seasons}>
            {seasons ? 
            <>
                <TitleText body='Temporadas:' style={{fontWeight: 'bold'}}/>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                    {seasons.map( (season, index) => 
                        <View style={{flexDirection: 'column', margin: 5}} key={index}>
                            <Pressable onPress={() => params.onSeasonPress(season, params.series.platforms)}>
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

export const SerieDetailScreen = (params: SerieDetailScreenParams) => {
    return (
        <ScrollView>
        <View style={styles.container}>
            {renderBackgroundImage(params)}
            <SeriesPlatforms platforms={params.series.platforms} status={params.series.status} />
            <NextEpisode episode={params.series.nextEpisode} platforms={params.series.platforms}/>
            <View style={styles.description}>
                <BodyText body={params.series.overview} />
                <View style={{height: 60}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                        {params.series.genres.map((genre, index) => 
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
            <CastList cast={params.series.cast} style={styles.cast} />
            <RecommendsList 
                onRecommendPress={params.onRecommendPress} 
                title='Series similares:'
                contents={params.series.similar} 
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
