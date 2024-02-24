import React from 'react';
import { Episode } from "../Types/Episodes"
import { View, Image } from 'react-native';
import { BodyText } from '../BasicComponents/BodyText';
import { Icon } from 'react-native-paper';
import { formatDate } from '../../utils/dateManager';
import { colors } from '../../assets';
import { CustomButton } from '../BasicComponents/CustomButton';
import { SeeContentButtom } from '../Content/SeeContentButtom';

type EpisodeOverlayEntry = {
    episode: Episode
}

export const EpisodeOverlay = (params: EpisodeOverlayEntry) => {
    const episode = params.episode;
    return(
        <View style={{margin: 5}}>
            <Image 
                source={{ uri: "https://image.tmdb.org/t/p/original" + episode.poster }} 
                style={{height: 150, width: "100%", borderRadius: 20}} /> 
            <BodyText 
                body={episode.episodeId + '. ' + episode.name} 
                size="big" 
                style={{fontWeight: 'bold', marginTop: 10}}/>
            <View style={{flexDirection: 'row', margin: 10}}>
                <Icon source="timer-outline" size={20}/>
                <BodyText body={' ' + episode.runtime + ' min'} size='medium' />
                <View style={{ flex: 1 }} >
                    <BodyText 
                        body={formatDate(episode.airDate.toDateString())} 
                        color={colors.primaryGrey} 
                        style={{fontWeight: 'bold', alignSelf: 'flex-end' }} 
                        size='medium'/>
                </View>
            </View>
            <BodyText body={episode.overview? episode.overview : ""} />
            <View style={{ alignSelf: 'flex-end'}}>
                {episode.platforms?
                    <SeeContentButtom platforms={episode.platforms} /> : null
                }
            </View>
        </View>
    )
}