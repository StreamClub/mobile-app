import React, { useState, useEffect }from 'react';
import {  StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { colors } from "../../assets";
import { ServiceEntry } from '../Types/Services';
import { Carousel } from '../BasicComponents/Carousel';
import { CarouselEntry } from '../BasicComponents/Types/CarouselParams';
import { TitleText } from '../BasicComponents/TitleText';
import { TmdbImageType } from '../BasicComponents/TmdbImage';

const screenWidth = Dimensions.get('window').width;

export type ServicesScreenCallbacks = {
    onUserServicePressed: (service: ServiceEntry) => void
}

type ServicesScreenParams = {
    userServices: ServiceEntry[]
    callbacks: ServicesScreenCallbacks
}

export const ServicesScreen = (params: ServicesScreenParams) => {
    const [services, setServices] = useState<CarouselEntry[]>([])

    useEffect(() => {
        const _services: CarouselEntry[] = []

        params.userServices.forEach(service => {
            _services.push({
                itemData: service,
                tmdbResource: service.logoPath,
            })
        })
        setServices(_services)
    }, [params.userServices])
    
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
            <TitleText body='Plataformas' size="big" style={{alignSelf: "flex-start"}}/>
            <Carousel 
                items={services} 
                itemStyle={styles.serviceLogo}
                containerStyle={{width: screenWidth}}
                type={TmdbImageType.Cover}
                onItemPressed={params.callbacks.onUserServicePressed}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    serviceLogo: {
        height: 60,
        aspectRatio: 1,
        borderRadius: 15,
        margin: 10,
        borderWidth: 1,
    },
});
