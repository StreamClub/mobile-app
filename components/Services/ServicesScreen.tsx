import React, { useState, useEffect }from 'react';
import {  StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { colors } from "../../assets";
import { ServiceEntry } from '../Types/Services';
import { Carousel } from '../BasicComponents/Carousel';
import { CarouselEntry } from '../BasicComponents/Types/CarouselParams';
import { TitleText } from '../BasicComponents/TitleText';
import { BodyText } from '../BasicComponents/BodyText';
import { TmdbImageType } from '../BasicComponents/TmdbImage';
import { getAllServices } from '../../apiCalls/services';
import { ServiceList, ServiceListParams } from './ServiceList';

const screenWidth = Dimensions.get('window').width;

const titleText = "Selecciona tus servicios de streaming"

export type ServicesScreenCallbacks = {
    onUserServicePressed: (service: ServiceEntry) => void
    onCheckService: (service: ServiceEntry, checked: Boolean) => void
}

export type ServicesScreenParams = {
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
    
    const serviceListParams: ServiceListParams = {
        userServices: params.userServices,
        allServices: params.allServices,
        onServicePressed: params.callbacks.onCheckService
    }

    return (
        <View style={styles.container}>

        
        <View style={styles.topContainer}>
        <BodyText body={titleText} size="big" style={{marginLeft: 10, marginVertical: 10, alignSelf: "flex-start", fontWeight: 'bold'}}/>
            <Carousel 
                items={services} 
                itemStyle={styles.serviceLogo}
                containerStyle={styles.carousel}
                type={TmdbImageType.Cover}
                onItemPressed={params.callbacks.onUserServicePressed}
                renderX
            />
        </View>
        <View style={styles.bottomContainer}>
            <ServiceList {...serviceListParams}/>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 0.3,
    },
    bottomContainer: {
        flex: 0.7,
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
