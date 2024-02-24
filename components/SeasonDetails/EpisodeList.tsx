import React, { useState } from 'react';
import { Pressable, View, Image } from "react-native";
import { styles } from "./styles/SeasonDetails.styles";
import { formatDate } from '../../utils/dateManager';
import { BodyText } from '../BasicComponents/BodyText';
import { colors } from '../../assets';
import { Icon } from 'react-native-paper';
import { Episode } from '../Types/Episodes';
import { EpisodeOverlay } from './EpisodeOverlay';
import { Overlay } from 'react-native-elements';
import { SeeContentButtom } from '../Content/SeeContentButtom';

type EpisodeListEntry = {
    episode: Episode,
    episodeNumber: number
}

export const EpisodeList = (params: EpisodeListEntry) => {
    const [openModal, setOpenModal] = useState(false);
    const episode = params.episode;

    return(
        <Pressable onPress={() => setOpenModal(true)} style={styles.episode} >
            <View style={styles.episode} >
                <Image 
                    source={{ uri: "https://image.tmdb.org/t/p/original" + episode.poster }} 
                    style={styles.episodePoster} /> 
                <View style={{flexDirection: 'column', width: 190, marginRight: 5}}>
                    <BodyText body={episode.episodeId + '. ' + episode.name} numberOfLines={2} style={{fontWeight: 'bold', flex: 1}} size='medium'/>
                    <BodyText body={formatDate(episode.airDate.toDateString())} color={colors.primaryGrey} style={{fontWeight: 'bold'}} size='small'/>
                    <View style={{flexDirection: 'row'}}>
                        <Icon source="timer-outline" size={20}/>
                        <BodyText body={' ' + episode.runtime + ' min'} size='small' />
                    </View>
                    <View style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', flex: 1, margin: 5}}>
                        {episode.platforms?
                            <SeeContentButtom platforms={episode.platforms} /> : null
                        }
                    </View>
                </View>
            </View>
            <Overlay 
                isVisible={openModal} 
                onBackdropPress={() => setOpenModal(false)} 
                overlayStyle={{backgroundColor: colors.primarySkyBlue, margin: 20, borderRadius: 20}}>
                <EpisodeOverlay episode={episode} />
            </Overlay>
        </Pressable>
    )
}