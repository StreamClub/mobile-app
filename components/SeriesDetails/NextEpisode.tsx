import React, {useState} from 'react';
import { styles } from './styles/SeriesDetails.styles';
import { View, Image } from 'react-native';
import { BodyText } from '../BasicComponents/BodyText';
import { colors } from '../../assets';
import { CustomButton } from '../BasicComponents/CustomButton';
import { SeeContentButtom } from '../Content/SeeContentButtom';
import { Platform } from '../Types/Platforms';

type Episode = {
    photo: string,
    airDate: Date,
    name: string
}

type NextEpisodeEntry = {
    episode: Episode,
    platforms: Array<Platform>
}

export const NextEpisode = (params: NextEpisodeEntry) => {
    const formatter = new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <View style={styles.nextEpisode} >
            <Image 
                source={{ uri: "https://image.tmdb.org/t/p/original" + params.episode.photo }} 
                style={styles.episodePhoto} /> 
            <View style={{flexDirection: 'column', width: 180}}>
                <BodyText body='Próximo capitulo: ' style={{fontWeight: 'bold'}} size='medium'/>
                <BodyText body={params.episode.name} size='medium' numberOfLines={1}/>
                <BodyText body={formatter.format(params.episode.airDate)} color={colors.primaryGrey} style={{fontWeight: 'bold'}}/>
                <View style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', flex: 1, margin: 10 }}>
                    <SeeContentButtom platforms={params.platforms} />
                </View>
            </View>
        </View>
    )
}