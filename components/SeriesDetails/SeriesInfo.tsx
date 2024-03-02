import React, { useState } from 'react';
import { SeriesDetail } from '../../entities/Details/Series/SeriesDetailEntry';
import { ImageBackground, LayoutChangeEvent, View } from 'react-native';
import { styles } from './styles/SeriesDetails.styles';
import { colors } from '../../assets';
import { TitleText } from '../BasicComponents/TitleText';
import { BodyText } from '../BasicComponents/BodyText';
import { getScreenSize } from '../../utils/screenUtils';
import { TmdbImage, TmdbImageType } from '../BasicComponents/TmdbImage';
import { SeriesCreators } from './SeriesCreators';

type SeriesInfoParams = {
    series: SeriesDetail;
}

export const SeriesInfo = (params: SeriesInfoParams) => {
    const [titleTextHeight, setTitleTextHeight] = useState(0);
    
    const handleTitleTextLayout = (event: LayoutChangeEvent) => {
        setTitleTextHeight(event.nativeEvent.layout.height);
    };

    const releaseYear = params.series.releaseDate? params.series.releaseDate.getFullYear() : "Desconocido";
    const lastYear = params.series.lastAirDate? params.series.lastAirDate.getFullYear() : "Desconocido";
    const totalEpisodes = params.series.totalEpisodes? params.series.totalEpisodes : "sin datos";
    const totalSeasons = params.series.totalSeasons? params.series.totalSeasons : "sin datos";
    const screenWidth = getScreenSize().width;
    const backgroundSize = 230 + (titleTextHeight/30 - 2)*30

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
                    body={"(" + releaseYear + ' - ' + lastYear + ")"} 
                    size='big' 
                    style={{width: screenWidth - 10, fontWeight: 'bold'}} /> : null}
                {params.series.status === 'Serie en emisión'?
                <TitleText 
                    body={"(" + releaseYear + ' - Presente)'} 
                    size='big' 
                    style={{width: screenWidth - 10, fontWeight: 'bold'}}/> : null}
                <View style={{width: screenWidth - 190}}>
                    <BodyText body={'Cant. espisodios: ' + totalEpisodes} size='medium' style={{fontWeight: 'bold'}} />
                    <BodyText body={'Cant. temporadas: ' + totalSeasons} size='medium' style={{fontWeight: 'bold'}} />
                    <SeriesCreators creators={params.series.createdBy} />
                </View>
            </View>
            <View style={[styles.imageOverlay, {top: backgroundSize - 90}]}>
                <TmdbImage
                    resource={params.series.poster}
                    type={TmdbImageType.Cover}
                    style={styles.posterImage} />
            </View>
        </ImageBackground>
    )
}