import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, LayoutChangeEvent, Pressable } from "react-native";
import { Icon } from 'react-native-paper';
import { colors } from "../assets";
import { BodyText } from '../components/BasicComponents/BodyText';
import { TitleText } from '../components/BasicComponents/TitleText';
import { Overlay } from '@rneui/themed';
import { Episode } from '../components/Types/Episodes';
import { EpisodeList } from '../components/SeasonDetails/EpisodeList';

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

export const SeasonDetailScreen = (params: SeasonDetailsScreenParams) => {
    const episodes = params.season.episodes;

    return(
        <ScrollView>
            {renderSeasonInfo(params.season)}
            <TitleText body={'Capítulos (' + episodes.length + '):'} style={{marginLeft: 20, marginTop: 20, fontWeight: 'bold'}}/>
            <View style={{alignItems: 'center', marginBottom: 20}}>
                {episodes ? episodes.map(
                    (episode: Episode, index: number) => <EpisodeList episode={episode} episodeNumber={index} key={index} />
                ) : null}
            </View>
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
    }
})