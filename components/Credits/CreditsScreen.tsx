import React from 'react';
import {  StyleSheet, ScrollView, Dimensions, View, Text, Image } from 'react-native';
import { WatchlistEntry } from '../Types/Watchlist';
import { Watchlist } from '../Watchlist';
import { colors } from '../../assets';
import { Carousel } from '../BasicComponents/Carousel';
import { CarouselEntry, CarouselParams } from '../BasicComponents/Types/CarouselParams';
import { TmdbImageType } from '../BasicComponents/TmdbImage';
import { seenContentEntryWrapper, SeenContentEntryWrapperProps } from '../SeenContent/SeenContentEntryWrapper';
import { ListEntry, List, ListParams } from '../BasicComponents/List';
import { CreditsEntry } from '../Types/Credits';
import { CreditsEntryWrapper, CreditsEntryWrapperProps } from './CreditsEntryWrapper';
const screenWidth = Dimensions.get('window').width

export type CreditsScreenParams = {
    crew: ListEntry[],
    cast: ListEntry[],
    onPressCreditsEntry: (creditEntry: CreditsEntry) => void,
}

export const CreditsScreen = (params: CreditsScreenParams) => {
    // const itemWrapperProps: SeenContentEntryWrapperProps = {
    //     width: itemWidth,
    //     showPercentText: true, 
    //     percentSize: 50,
    //     marginHorizontal: 10,
    //     bottomLastSeen: 9,
    //     leftPercent: 15,
    //     topPercent: 15,
    //     sizeLastSeenIcons: 30,
    // }

    const castListParams: ListParams = {
        list: params.cast,
        listEntryStyle: styles.poster,
        type: TmdbImageType.Cover,
        listEntryWrapper: CreditsEntryWrapper,
        listEntryWrapperProps: null,
        onPressListEntry: params.onPressCreditsEntry,
    }
    const crewListParams: ListParams = {
        list: params.crew,
        listEntryStyle: styles.poster,
        type: TmdbImageType.Cover,
        listEntryWrapper: CreditsEntryWrapper,
        listEntryWrapperProps: null,
        onPressListEntry: params.onPressCreditsEntry,
    }

    return (
        <ScrollView style={styles.container}>
            <List {...castListParams}/>
            <List {...crewListParams}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondaryWhite,
    },
    poster: {
        width: "100%",
        aspectRatio: 2/3,
    },
});
