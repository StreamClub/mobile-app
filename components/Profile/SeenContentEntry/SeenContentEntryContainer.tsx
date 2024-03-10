import React, { useState } from 'react'
import { Image, View, StyleSheet } from 'react-native';
import { LocalIcon } from '../../Types/LocalIcon';
import { seenContentStyles } from '../styles/SeenContentStyle';
import { colors } from '../../../assets';
import { SeenContentEntryFooter } from './SeenContentEntryFooter';
import { SeenContentEntry } from '../../Types/SeenContentEntry';

function renderLastEpisodeSection(lastSeenEpisodeContainer: ({ marginHorizontal: number; height: number; backgroundColor: string; position: "absolute"; bottom: number; zIndex: number; } | { width: number; borderBottomLeftRadius: number; borderBottomRightRadius: number; })[]): React.ReactNode {
    return <View style={lastSeenEpisodeContainer}>

    </View>;
}

function renderPercentSeen(): React.ReactNode {
    return <Image
        source={LocalIcon.percentTemplate}
        style={styles.percent} />;
}


export const renderItemContainer = (itemComponent: React.ReactElement, itemData: SeenContentEntry) => {
    const itemWidth = seenContentStyles.contentPoster.height * seenContentStyles.contentPoster.aspectRatio;
    const itemBorderRadius = seenContentStyles.contentPoster.borderRadius;
    const lastSeenEpisodeContainer = [
        styles.lastSeenEpisodeContainer, 
        {
            width: itemWidth, 
            borderBottomLeftRadius: itemBorderRadius, 
            borderBottomRightRadius: itemBorderRadius
        },
    ]

    const isSeries = itemData.contentType === 'series';
    const lastSeenEpisode = isSeries? itemData.lastSeenEpisode : null;
    const seen = isSeries ? itemData.seen : null;

    return (
        <View>
            <View style={styles.itemInnerContainer}>
                {isSeries && seen &&
                    renderPercentSeen()
                }
                {isSeries && lastSeenEpisode &&
                    renderLastEpisodeSection(lastSeenEpisodeContainer)
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
        width: 50,
        height: 50,
        zIndex: 1,
    },
    lastSeenEpisodeContainer: {
        marginHorizontal: 10, 
        height: 50, 
        backgroundColor: colors.primaryGrey,  
        position: 'absolute', 
        bottom: 10, 
        zIndex: 1,
    },

});
