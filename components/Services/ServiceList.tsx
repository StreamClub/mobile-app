import React, { useState, useEffect } from 'react';
import {  StyleSheet, Image, View, ScrollView, Pressable, NativeSyntheticEvent, NativeScrollEvent, Animated, LayoutChangeEvent } from 'react-native';
import { colors } from "../../assets";
import { ServiceEntry } from '../Types/Services';
import { TmdbImage, TmdbImageParams, TmdbImageType } from '../BasicComponents/TmdbImage';
import { LocalIcon } from '../Types/LocalIcon';

const renderServiceEntry = (service: ServiceEntry, index: number, params: ServiceListParams) => {
    const _params: TmdbImageParams = {
        resource: service.logoPath,
        type: TmdbImageType.Cover,
        style: styles.logoStyle,
    }

    return (
        // <Pressable key={index} onPress={() => params.onItemPressed(item.itemData)} style={{position: "relative"}}>
            <TmdbImage {..._params}/>
        // </Pressable>
    )
}

export type ServiceListParams= {
    services: ServiceEntry[]
    onServicePressed: (service: ServiceEntry) => void
}

export const ServiceList = (params: ServiceListParams) => {
    return (
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            {params.services.map((service, index) => renderServiceEntry(service, index, params))}
        </ScrollView>

    )
}


const styles = StyleSheet.create({
    contentContainerStyle: {
        alignItems: 'flex-start',
        backgroundColor: "white",
        width: 200,
    },
    logoStyle: {
        height: 100,
        aspectRatio: 1,
        borderRadius: 25,
        margin: 10,
    },
});

