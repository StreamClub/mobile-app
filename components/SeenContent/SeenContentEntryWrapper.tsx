import React from 'react'
import { View, StyleSheet } from 'react-native';
import { colors } from '../../assets';
import { SeenContentEntry } from '../Types/SeenContentEntry';
import { LinearGradient } from 'expo-linear-gradient';
import { BodyText } from '../BasicComponents/BodyText';
import { EpisodeNumber } from '../Types/EpisodeNumber';
import { Percent } from '../BasicComponents/Percent';
import { formatDateDDMMYYYY } from '../../utils/dateManager';

function renderLastEpisodeSection(params: SeenContentEntryWrapperParams): React.ReactNode {
    const { itemObject, props } = params
    const lastSeenEpisodeContainer = [
        styles.lastSeenEpisodeContainer,
        {
            width: props.width,
            marginHorizontal: props.marginHorizontal,
            bottom: props.bottomLastSeen
        },
    ]

    const lastSeenEpisode: EpisodeNumber = itemObject.lastSeenEpisode? itemObject.lastSeenEpisode : {seasonId: 0, episodeId: 0};

    const lastSeenEpisodeText = "Último visto " + lastSeenEpisode.seasonId + "x" + lastSeenEpisode.episodeId;

    return <LinearGradient 
        colors={['rgba(255, 255, 255, 0)', colors.primaryGrey, 'rgba(255, 255, 255, 0)']}
        style={lastSeenEpisodeContainer}
        start={{x: 0.5, y: 0}} end={{x: 0.5, y: 1}}
        >
            <BodyText body={lastSeenEpisodeText} size='medium' style={{fontWeight: 'bold'}}/>
        </LinearGradient>
}

export type SeenContentEntryWrapperProps = {
    width: number;
    showPercentText: Boolean;
    percentSize: number;
    marginHorizontal: number;
    bottomLastSeen: number;
    topPercent: number;
    leftPercent: number,
    sizeLastSeenIcons: number;
}

export type SeenContentEntryWrapperParams = {
    itemComponent: React.ReactElement;
    itemObject: SeenContentEntry;
    props: SeenContentEntryWrapperProps;
}

export const seenContentEntryWrapper = (params: SeenContentEntryWrapperParams) => {
    const isSeries = params.itemObject.contentType === 'series';
    const lastSeenEpisode = isSeries? params.itemObject.lastSeenEpisode : null;
    const seen = isSeries ? params.itemObject.seen : null;
    const updatedDate = formatDateDDMMYYYY(params.itemObject.updatedAt);
    
    return (
        <View>
            <BodyText body={updatedDate} size='medium' style={{marginLeft: 10}}/>
            <View style={styles.itemInnerContainer}>
                {isSeries && seen &&
                    <Percent style={[styles.percent, {top: params.props.topPercent, left: params.props.leftPercent}]} percent={seen} size={params.props.percentSize} showText={params.props.showPercentText}/>
                }
                {isSeries && lastSeenEpisode &&
                    renderLastEpisodeSection(params)
                }
                {params.itemComponent}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemInnerContainer: { 
        alignSelf: 'center', 
        position: 'relative',
    },
    percent: {
        position: 'absolute',
        zIndex: 1,
    },
    lastSeenEpisodeContainer: {
        height: 50,  
        position: 'absolute',  
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : 'transparent',
    },

});
