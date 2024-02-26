import React, { useState, useEffect } from 'react';
import {  StyleSheet, Image, Text, View, ScrollView, Pressable, NativeSyntheticEvent, NativeScrollEvent, Dimensions, Animated } from 'react-native';
import { colors } from "../../assets";
import { ServiceEntry } from '../Types/Services';
import { TmdbImage, TmdbImageParams, TmdbImageType } from '../BasicComponents/TmdbImage';
import { LocalIcon } from '../Types/LocalIcon';

type ServicesCarouselParams = {
    services: ServiceEntry[]
}

const renderService = (service: ServiceEntry, index: number) => {
    const params: TmdbImageParams = {
        resource: service.logoPath,
        type: TmdbImageType.Cover,
        style: styles.logoStyle,
    }

    return (
        <Pressable key={index} onPress={() => console.log(service.providerName)}>
            <TmdbImage {...params}/>
        </Pressable>
    )
}

const isCloseToRight = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    return layoutMeasurement.width + contentOffset.x >= contentSize.width - 40;
};

const isCloseToLeft = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToLeft = 40;
    return contentOffset.x <= paddingToLeft;
};

export const ServicesCarousel = (params: ServicesCarouselParams) => {
    const [showLeftIcon, setShowLeftIcon] = useState(false)
    const initialRightIcon = params.services.length > 5 ? true : false
    const [showRightIcon, setShowRightIcon] = useState(initialRightIcon)
    const [opacityLeft] = useState(new Animated.Value(showLeftIcon ? 1 : 0));
    const [opacityRight] = useState(new Animated.Value(showRightIcon ? 1 : 0));

    useEffect(() => {
        Animated.timing(opacityLeft, {
          toValue: showLeftIcon ? 1 : 0,
          duration: 500, // Duración de la animación en milisegundos
          useNativeDriver: true, // Utilizar el driver nativo para optimizar el rendimiento
        }).start();
      }, [showLeftIcon]);

    useEffect(() => {
        Animated.timing(opacityRight, {
          toValue: showRightIcon ? 1 : 0,
          duration: 500, // Duración de la animación en milisegundos
          useNativeDriver: true, // Utilizar el driver nativo para optimizar el rendimiento
        }).start();
      }, [showRightIcon]);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isCloseToRight(event.nativeEvent)) {
            setShowRightIcon(false)
        } else {
            setShowRightIcon(true)
        }
        if (isCloseToLeft(event.nativeEvent)) {
            setShowLeftIcon(false)
        } else {
            setShowLeftIcon(true)
        }
    }
    
    const leftIcon = LocalIcon.left
    const rightIcon = LocalIcon.right

    return (
        <View style={{position: "relative", flex: 1 }}>
            <Animated.View style={[styles.sideIconContainerLeft, {opacity: opacityLeft}]}><Image source={leftIcon} style={styles.sideIconLeft} /></Animated.View>
            <ScrollView 
                horizontal 
                style={styles.container} 
                contentContainerStyle={styles.contentContainerStyle}
                onScroll={onScroll}
            >
                {params.services.map((service, index) => renderService(service, index))}
            </ScrollView>
            <Animated.View style={[styles.sideIconContainerRight, {opacity: opacityRight}]}><Image source={rightIcon} style={styles.sideIconRight} /></Animated.View>
        </View>
    )
}


const styles = StyleSheet.create({
    contentContainerStyle: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    container: {
        // backgroundColor: "yellow",
    },
    logoStyle: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 5,
    },
    sideIconContainerLeft: {
        position: "absolute",
        backgroundColor: colors.secondaryWhite,
        zIndex: 3,
        left: 0,
        height: 100,
        width: 30,
    },
    sideIconContainerRight: {
        position: "absolute",
        backgroundColor: colors.secondaryWhite,
        zIndex: 3,
        right: 0,
        height: 100,
        width: 30,
    },
    sideIconLeft: {
        position: "absolute",
        top: 20,
        left: 5,
        zIndex: 2,
        width: 20,
        height: 32,
        justifyContent: 'flex-start',
    },
    sideIconRight: {
        position: "absolute",
        top: 20,
        right: 5,
        zIndex: 2,
        width: 20,
        height: 32,
    },
    
});
