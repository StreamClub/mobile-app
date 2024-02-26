import React from 'react';
import {  StyleSheet, Text, ScrollView } from 'react-native';
import { colors } from "../../assets";
import { ServiceEntry } from '../Types/Services';

type ServicesScreenParams = {
    userServices: ServiceEntry[]
}

export const ServicesScreen = (params: ServicesScreenParams) => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
            <Text> Ventana de servicios </Text>
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
