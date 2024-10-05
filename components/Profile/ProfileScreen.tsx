import React, { useCallback, useState } from 'react';
import {  StyleSheet, Dimensions, FlatList, RefreshControl } from 'react-native';
import { Watchlist } from '../Watchlist';
import { ProfileHeader, ProfileHeaderParams } from './ProfileHeader';
import { colors } from '../../assets';
import { Carousel } from '../BasicComponents/Carousel';
import { CarouselEntry, CarouselParams } from '../BasicComponents/Types/CarouselParams';
import { TmdbImageType } from '../BasicComponents/TmdbImage';
import { seenContentEntryWrapper, SeenContentEntryWrapperProps } from '../SeenContent/SeenContentEntryWrapper';
import { TitleText } from '../BasicComponents/TitleText';
import { BodyText } from '../BasicComponents/BodyText';
import { SeenContentEntry } from '../Types/SeenContentEntry';
import { router } from 'expo-router';
import { ContentDetailsParams } from '../../apiCalls/params/content/ContentDetailsParams';
import { SeenContentParams } from '../../app/(app)/seenContent';

const screenWidth = Dimensions.get('window').width

export type ProfileScreenParams = {
    editable?: boolean;
    profileHeader: ProfileHeaderParams;
    userServices: CarouselEntry[];
    seenContent: CarouselEntry[];
    getAll: () => void;
}

export const ProfileScreen = (params: ProfileScreenParams) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        params.getAll()
        setRefreshing(false);
      }, []);
    
    const editable = (params.editable != null)? params.editable : true;
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

    const onPressSeenContentEntry = (itemObject: SeenContentEntry) => {
        const contentScreenParams: ContentDetailsParams = {
            id: itemObject.id.toString(),
        }

        //TODO: Refactorizar para usar o bien entities o bien un enum
        const pathname = itemObject.contentType === 'movie' ? '/movie' : '/serie'
        router.push({ pathname: pathname, params: contentScreenParams })
    }

    const seenContentCarouselParams: CarouselParams = {
        items: params.seenContent,
        itemStyle: seenContentStyles.contentPoster,
        containerStyle: styles.carousel,
        type: TmdbImageType.Cover,
        itemWrapper: seenContentEntryWrapper,
        itemWrapperProps: itemWrapperProps,
        onItemPressed: onPressSeenContentEntry,
    }

    const onPressMoreSeenContent = () => {
        const routeParams: SeenContentParams = {userId: params.profileHeader.id.toString()};
        router.push({ pathname: '/seenContent', params: routeParams });
    }

    const onPressManageServices = () => {
        router.push('/services')
    }

    const renderProfileContent = () => {
        return (
            <>
                <ProfileHeader {...params.profileHeader}/>

                <TitleText body="Mis plataformas" style={styles.titleText} size='medium'/>
                <Carousel {...userServicesCarouselParams}/>
                {editable?
                    <BodyText body={"Gestionar plataformas"} size="medium" style={styles.linkedText} onPress={onPressManageServices}/> :
                    null
                }
                {params.seenContent.length > 0 && <>
                    <TitleText body="Últimas visualizaciones" style={styles.titleText} size='medium'/>
                    <Carousel {...seenContentCarouselParams}/>
                    <BodyText body={"Ver más actividad"} size="medium" style={styles.linkedText} onPress={onPressMoreSeenContent}/>
                </>}
            </>
        )
    }

    return (

        <FlatList
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={renderProfileContent()}
            ListFooterComponent={<Watchlist userId={params.profileHeader.id}/>}
            data={[]}
            renderItem={() => null}
        />
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