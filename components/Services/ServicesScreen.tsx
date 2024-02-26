import React from 'react';
import {  StyleSheet, Text, ScrollView } from 'react-native';
import { colors } from "../../assets";
import { ServiceEntry } from '../Types/Services';
import { ServicesCarousel } from './ServicesCarousel';
import { TitleText } from '../BasicComponents/TitleText';

type ServicesScreenParams = {
    userServices: ServiceEntry[]
}

export const ServicesScreen = (params: ServicesScreenParams) => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
            <TitleText body='Plataformas' size="big" style={{alignSelf: "flex-start"}}/>
            <ServicesCarousel services={params.userServices}/>
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
});
