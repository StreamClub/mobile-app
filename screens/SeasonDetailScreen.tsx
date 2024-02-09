import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, LayoutChangeEvent, Pressable } from "react-native";
import { Icon } from 'react-native-paper';
import { colors } from "../assets";
import { BodyText } from '../components/BasicComponents/BodyText';
import { CustomButton } from '../components/BasicComponents/CustomButton';
import { TitleText } from '../components/BasicComponents/TitleText';
import { Overlay } from '@rneui/themed';

export type Episode = {
    airDate: Date;
    episodeNumber: number;
    name: string;
    overview: string;
    runtime: number;
    poster: string;
}

type SeasonDetails = {
    airDate: Date;
    name: string;
    overview: string;
    poster: string;
    episodes: Array<Episode>;
};

type SeasonDetailsScreenParams = {
    season: SeasonDetails;
}

const renderSeasonInfo = (season: SeasonDetails) => {
    const [titleTextHeight, setTitleTextHeight] = useState(0);
    const [openOverview, setOpenOverview] = useState(false);
    
    const handleTitleTextLayout = (event: LayoutChangeEvent) => {
        setTitleTextHeight(event.nativeEvent.layout.height);
    };

    return(
        <View style={styles.details}>
                <View style={styles.posterView}>
                    {season.poster?
                        <Image 
                            source={{ uri: "https://image.tmdb.org/t/p/original" + season.poster }}
                            style={styles.poster}
                        /> :
                        <View style={styles.poster}>
                            <Icon source="image-off-outline" size={90}/>
                        </View>
                    }
                </View>
                <View style={styles.info}>
                    <BodyText body={season.name} style={{fontWeight: 'bold'}} 
                    size='big' onLayout={handleTitleTextLayout}/>
                    <Pressable 
                        onPress={() => setOpenOverview(true)}
                        style={{flex: 1, height: (255 - titleTextHeight)}}>
                        <BodyText body={season.overview} size='small' style={{flex: 1}}/>
                        {season.overview.length > 10?
                        <BodyText 
                            body="Ver más" size='small' 
                            color={colors.primaryBlue} 
                            style={{alignSelf: 'flex-end',marginRight: 20, fontWeight: 'bold'}}/> : null}
                    </Pressable>
                </View>
                <Overlay 
                    isVisible={openOverview && (season.overview.length > 10)} 
                    onBackdropPress={() => setOpenOverview(false)} 
                    overlayStyle={{backgroundColor: colors.primarySkyBlue, margin: 20, borderRadius: 20}}>
                        <BodyText body={season.overview} />
                </Overlay>
            </View>
    )
}


const renderEpisode = (episode: Episode, index: number, openEpisode: (episode: number) => void) => {
    const formatter = new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <Pressable onPress={() => openEpisode(index)} style={styles.episode} key={index}>
            <View style={styles.episode} >
                <Image 
                    source={{ uri: "https://image.tmdb.org/t/p/original" + episode.poster }} 
                    style={styles.episodePoster} /> 
                <View style={{flexDirection: 'column', width: 190, marginRight: 5}}>
                    <BodyText body={episode.episodeNumber + '. ' + episode.name} numberOfLines={2} style={{fontWeight: 'bold', flex: 1}} size='medium'/>
                    <BodyText body={formatter.format(episode.airDate)} color={colors.primaryGrey} style={{fontWeight: 'bold'}} size='small'/>
                    <View style={{flexDirection: 'row'}}>
                        <Icon source="timer-outline" size={20}/>
                        <BodyText body={' ' + episode.runtime + ' min'} size='small' />
                    </View>
                    <View style={{ alignSelf: 'flex-end', justifyContent: 'flex-end', flex: 1}}>
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
        </Pressable>
    )
}

const renderEpisodeDetails = (episode: Episode) => {
    const formatter = new Intl.DateTimeFormat('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    
    return(
        <View style={{margin: 5}}>
            <Image 
                source={{ uri: "https://image.tmdb.org/t/p/original" + episode.poster }} 
                style={{height: 150, width: "100%", borderRadius: 20}} /> 
            <BodyText 
                body={episode.episodeNumber + '. ' + episode.name} 
                size="big" 
                style={{fontWeight: 'bold', marginTop: 10}}/>
            <View style={{flexDirection: 'row', margin: 10}}>
                <Icon source="timer-outline" size={20}/>
                <BodyText body={' ' + episode.runtime + ' min'} size='medium' />
                <View style={{ flex: 1 }} >
                    <BodyText 
                        body={formatter.format(episode.airDate)} 
                        color={colors.primaryGrey} 
                        style={{fontWeight: 'bold', alignSelf: 'flex-end' }} 
                        size='medium'/>
                </View>
            </View>
            <BodyText body={episode.overview} />
            <View style={{ alignSelf: 'flex-end'}}>
                <CustomButton 
                    buttonText="Ver ahora" 
                    fontSize='small'
                    type='primary' 
                    onPress={() => console.log("Que buena serie estoy viendo")} 
                    icon="play"
                    style={{width: 120, margin: 10}}/>
            </View>
        </View>
    )
}

export const SeasonDetailScreen = (params: SeasonDetailsScreenParams) => {
    const episodes = params.season.episodes;
    const [openedEpisode, setOpenedEpisode] = useState(-1);

    const openModal = (episode: number) => {
        setOpenedEpisode(episode);
        console.log(episode);
    }

    return(
        <ScrollView>
            {renderSeasonInfo(params.season)}
            <TitleText body={'Capítulos (' + episodes.length + '):'} style={{marginLeft: 20, marginTop: 20, fontWeight: 'bold'}}/>
            <View style={{alignItems: 'center', marginBottom: 20}}>
                {episodes ? episodes.map(
                    (episode: Episode, index: number) => renderEpisode(episode, index, openModal)
                ) : null}
            </View>
            <Overlay 
                isVisible={openedEpisode >= 0} 
                onBackdropPress={() => setOpenedEpisode(-1)} 
                overlayStyle={{backgroundColor: colors.primarySkyBlue, margin: 20, borderRadius: 20}}>
                {openedEpisode >= 0 ? renderEpisodeDetails(episodes[openedEpisode]) : null }
            </Overlay>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    poster: {
        height: 255,
        width: 170,
        borderColor: colors.primaryBlack,
        borderWidth: 1,
        marginRight: 5,
        marginLeft: 20,
        marginTop: 20
    },
    posterView: {
        alignSelf: 'flex-start',
        flexShrink: 0,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    episode: {
        width: 350,
        height: 170,
        backgroundColor: colors.primarySkyBlue,
        margin: 5,
        borderRadius: 20,
        flexDirection: 'row',
        flex: 1
    },
    episodePoster: {
        flex: 1,
        margin: 5,
        borderRadius: 20
    }
})