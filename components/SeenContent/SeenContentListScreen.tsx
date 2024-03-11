import React from 'react';
import {  StyleSheet, ScrollView, Dimensions, View, Text, Image } from 'react-native';
import { colors } from '../../assets';
import { Carousel } from '../BasicComponents/Carousel';
import { CarouselEntry, CarouselParams } from '../BasicComponents/Types/CarouselParams';
import { TmdbImageType } from '../BasicComponents/TmdbImage';
import { TmdbImage } from '../BasicComponents/TmdbImage';
import { LocalIcon } from '../Types/LocalIcon';
import { renderItemContainer } from '../SeenContent/SeenContentEntryContainer';
import { seenContentStyles } from '../SeenContent/styles/SeenContentStyle';
import { TitleText } from '../BasicComponents/TitleText';
import { BodyText } from '../BasicComponents/BodyText';
import { SeenContentEntry } from '../Types/SeenContentEntry';
import { SeenContentList } from './SeenContentList';

const screenWidth = Dimensions.get('window').width

export type SeenContentListScreenParams = {
    seenContentList: SeenContentEntry[];
}

export const SeenContentListScreen = (params: SeenContentListScreenParams) => {
    return (
        <ScrollView style={styles.container}>
            <SeenContentList seenContentList={params.seenContentList}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondaryWhite,
    },
    carousel: {
        width: screenWidth,
    },
    serviceLogo: {
        height: 60,
        aspectRatio: 1,
        borderRadius: 15,
        margin: 10,
        borderWidth: 1,
    },
    linkedText: {
        color: colors.primaryBlue,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 8,
        textDecorationLine: 'underline',
    },
    titleText: {
        fontWeight:'bold', 
        marginLeft: 10
    },
});
