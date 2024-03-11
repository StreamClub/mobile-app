import React, { useState } from 'react'
import { Image, View, StyleSheet } from 'react-native';
import { LocalIcon } from '../Types/LocalIcon';
import { seenContentStyles } from './styles/SeenContentStyle';
import { colors } from '../../assets';
import { SeenContentEntryFooter } from './SeenContentEntryFooter';
import { SeenContentEntry } from '../Types/SeenContentEntry';
import { LinearGradient } from 'expo-linear-gradient';
import { BodyText } from '../BasicComponents/BodyText';
import { EpisodeNumber } from '../Types/EpisodeNumber';
import { Percent } from '../BasicComponents/Percent';

function renderLastEpisodeSection(itemWidth: number, itemBorderRadius: number, itemData: SeenContentEntry): React.ReactNode {
    const lastSeenEpisodeContainer = [
        styles.lastSeenEpisodeContainer, 
        {
            width: itemWidth,
            alignSelf: 'center',
            borderBottomLeftRadius: itemBorderRadius, 
            borderBottomRightRadius: itemBorderRadius,
        },
    ]

    const lastSeenEpisode: EpisodeNumber = itemData.lastSeenEpisode? itemData.lastSeenEpisode : {seasonId: 0, episodeId: 0};

    const lastSeenEpisodeText = "Último visto " + lastSeenEpisode.seasonId + "x" + lastSeenEpisode.episodeId;

    return <LinearGradient 
        colors={['rgba(255, 255, 255, 0)', colors.primaryGrey, 'rgba(255, 255, 255, 0)']}
        style={lastSeenEpisodeContainer}
        start={{x: 0.5, y: 0}} end={{x: 0.5, y: 1}}
        >
            <BodyText body={lastSeenEpisodeText} size='medium' style={{fontWeight: 'bold'}}/>
        </LinearGradient>
}

export const renderItemContainer = (itemComponent: React.ReactElement, itemData: SeenContentEntry, width?: number, showText: Boolean = true, size: number = 50) => {
    const itemWidth = width? width : seenContentStyles.contentPoster.height * seenContentStyles.contentPoster.aspectRatio;
    const itemBorderRadius = seenContentStyles.contentPoster.borderRadius;

    const isSeries = itemData.contentType === 'series';
    const lastSeenEpisode = isSeries? itemData.lastSeenEpisode : null;
    const seen = isSeries ? itemData.seen : null;

    return (
        <View>
            <View style={styles.itemInnerContainer}>
                {isSeries && seen &&
                    <Percent style={styles.percent} percent={seen} size={size} showText={showText}/>
                }
                {isSeries && lastSeenEpisode &&
                    renderLastEpisodeSection(itemWidth, itemBorderRadius, itemData)
                }
                {itemComponent}
            </View>
            <SeenContentEntryFooter />
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
        top: 15,
        left: 15,
        zIndex: 1,
    },
    lastSeenEpisodeContainer: {
        // marginHorizontal: 10, 
        height: 50,  
        position: 'absolute', 
        bottom: 9, 
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : 'transparent',
    },

});
