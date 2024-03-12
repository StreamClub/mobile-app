import React from 'react';
import {  StyleSheet, ScrollView, Dimensions, View, Text, Image } from 'react-native';
import { WatchlistEntry } from '../Types/Watchlist';
import { Watchlist } from '../Watchlist';
import { ProfileHeader, ProfileHeaderParams } from './ProfileHeader';
import { colors } from '../../assets';
import { Carousel } from '../BasicComponents/Carousel';
import { CarouselEntry, CarouselParams } from '../BasicComponents/Types/CarouselParams';
import { TmdbImageType } from '../BasicComponents/TmdbImage';
import { seenContentEntryWrapper, SeenContentEntryWrapperProps } from '../SeenContent/SeenContentEntryWrapper';
import { TitleText } from '../BasicComponents/TitleText';
import { BodyText } from '../BasicComponents/BodyText';

const screenWidth = Dimensions.get('window').width

export type ProfileScreenParams = {
    watchlist: WatchlistEntry[];
    profileHeader: ProfileHeaderParams;
    userServices: CarouselEntry[];
    seenContent: CarouselEntry[];
    onPressMoreSeenContent: () => void;
}

export const ProfileScreen = (params: ProfileScreenParams) => {
    
    const userServicesCarouselParams: CarouselParams = {
        items: params.userServices,
        itemStyle: styles.serviceLogo,
        containerStyle: styles.carousel,
        type: TmdbImageType.Cover,
    }

    const itemWidth = seenContentStyles.contentPoster.height * seenContentStyles.contentPoster.aspectRatio;

    const itemWrapperProps: SeenContentEntryWrapperProps = {
        width: itemWidth,
        showPercentText: true, 
        percentSize: 50,
        marginHorizontal: 10,
        bottomLastSeen: 9,
        leftPercent: 15,
        topPercent: 15,
        sizeLastSeenIcons: 30,
    }

    const seenContentCarouselParams: CarouselParams = {
        items: params.seenContent,
        itemStyle: seenContentStyles.contentPoster,
        containerStyle: styles.carousel,
        type: TmdbImageType.Cover,
        itemWrapper: seenContentEntryWrapper,
        itemWrapperProps: itemWrapperProps,
    }

    return (
        <ScrollView style={styles.container}>
            <ProfileHeader {...params.profileHeader}/>

            <TitleText body="Mis plataformas" style={styles.titleText} size='medium'/>
            <Carousel {...userServicesCarouselParams}/>
            <BodyText body={"Gestionar plataformas"} size="medium" style={styles.linkedText}/>

            <TitleText body="Últimas visualizaciones" style={styles.titleText} size='medium'/>
            <Carousel {...seenContentCarouselParams}/>
            <BodyText body={"Ver más actividad"} size="medium" style={styles.linkedText} onPress={params.onPressMoreSeenContent}/>
            
            <TitleText body="Watchlist" style={styles.titleText} size='medium'/>
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

export const seenContentStyles = StyleSheet.create({
    contentPoster: {
        height: (screenWidth/1.7),
        aspectRatio: 2/3,
        borderRadius: 5,
        margin: 0,
        marginHorizontal: 10,
        borderWidth: 1,
    },
});