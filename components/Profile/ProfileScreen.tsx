import React from 'react';
import {  StyleSheet, ScrollView, Dimensions } from 'react-native';
import { WatchlistEntry } from '../Types/Watchlist';
import { Watchlist } from '../Watchlist';
import { ProfileHeader, ProfileHeaderParams } from './ProfileHeader';
import { colors } from '../../assets';
import { Carousel } from '../BasicComponents/Carousel';
import { CarouselEntry, CarouselParams } from '../BasicComponents/Types/CarouselParams';
import { TmdbImageType } from '../BasicComponents/TmdbImage';

const screenWidth = Dimensions.get('window').width

export type ProfileScreenParams = {
    watchlist: WatchlistEntry[];
    profileHeader: ProfileHeaderParams;
    userServices: CarouselEntry[];
}

export const ProfileScreen = (params: ProfileScreenParams) => {
    
    const carouselParams: CarouselParams = {
        items: params.userServices,
        itemStyle: styles.serviceLogo,
        containerStyle: styles.carousel,
        type: TmdbImageType.Cover,
    }

    return (
        <ScrollView style={styles.container}>
            <ProfileHeader {...params.profileHeader}/>
            <Carousel {...carouselParams}/>
            <Watchlist watchlist={params.watchlist}/>
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
});
