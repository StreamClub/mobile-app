import React, { useState, useEffect }from 'react';
import {  StyleSheet, Text, ScrollView, Dimensions } from 'react-native';
import { colors } from "../../assets";
import { ServiceEntry } from '../Types/Services';
import { Carousel } from '../BasicComponents/Carousel';
import { CarouselEntry } from '../BasicComponents/Types/CarouselParams';
import { TitleText } from '../BasicComponents/TitleText';
import { BodyText } from '../BasicComponents/BodyText';
import { TmdbImageType } from '../BasicComponents/TmdbImage';
import { getAllServices } from '../../apiCalls/services';
import { ServiceList } from './ServiceList';

const screenWidth = Dimensions.get('window').width;

const titleText = "Selecciona tus servicios de streaming"

export type ServicesScreenCallbacks = {
    onUserServicePressed: (service: ServiceEntry) => void
    onCheckService: (service: ServiceEntry) => void
}

type ServicesScreenParams = {
    userServices: ServiceEntry[]
    allServices: ServiceEntry[]
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
            <BodyText body={titleText} size="big" style={{marginLeft: 10, marginVertical: 10, alignSelf: "flex-start"}}/>
            <Carousel 
                items={services} 
                itemStyle={styles.serviceLogo}
                containerStyle={styles.carousel}
                type={TmdbImageType.Cover}
                onItemPressed={params.callbacks.onUserServicePressed}
                renderX
            />

            <ServiceList services={params.allServices} onServicePressed={params.callbacks.onCheckService}/>
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
