import React, { useState} from 'react';
import { ImageBackground, LayoutChangeEvent, View } from "react-native"
import { TitleText } from '../BasicComponents/TitleText';
import { Icon } from 'react-native-paper';
import { BodyText } from '../BasicComponents/BodyText';
import { TmdbImage, TmdbImageType } from '../BasicComponents/TmdbImage';
import { MovieDetail } from '../../entities/Details/MovieDetailEntry';
import { styles } from './styles/MovieDetails.style';
import { colors } from '../../assets';
import { getScreenSize } from '../../utils/screenUtils';
import { MovieDirectors } from './MovieDirectors';

type MovieInfoParams = {
    movie: MovieDetail
}

export const MovieInfo = (params: MovieInfoParams) => {
    const [titleTextHeight, setTitleTextHeight] = useState(0);
    const screenWidth = getScreenSize().width;
    
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
            {params.movie.backdrop?
                <View style={[styles.darkness, {height: backgroundSize}]} /> :
                <View style={[styles.darkness, {height: backgroundSize, backgroundColor: colors.primarySkyBlue + '85'}]} />
            }
            <View style={styles.textOverlay}>
                <TitleText
                    body={params.movie.title + 
                        (params.movie.releaseDate.getFullYear()? ' (' + params.movie.releaseDate.getFullYear() + ')' : '')} 
                    size='big' 
                    style={{width: screenWidth - 10, fontWeight: 'bold'}} 
                    onLayout={handleTitleTextLayout}
                />
                <View style={{width: screenWidth - 190, marginTop: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <Icon source="timer-outline" size={20}/>
                        <BodyText body={' ' + params.movie.runtime + ' min'} size='big' style={{fontWeight: 'bold'}} />
                    </View>
                    <MovieDirectors directors={params.movie.directors} titleTextHeight={titleTextHeight} />
                </View>
            </View>
            <View style={[styles.imageOverlay, {top: backgroundSize - 90}]}>
                <TmdbImage 
                    resource={params.movie.poster} 
                    type={TmdbImageType.Cover} 
                    style={styles.posterImage} />
            </View>
        </ImageBackground>
    )
}