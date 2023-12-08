import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { TitleText } from './BasicComponents/TitleText';
import { router } from 'expo-router';

export const SignUpHeader = () => {
    return (
        <Appbar.Header style={styles.header}>
            <Appbar.BackAction onPress={() => router.back()} />
            <View style={styles.titleText}>
                <TitleText body="Sumate a" color='#FFFFFF'/>
                <TitleText body="Stream Club" color='#FFFFFF'/>
            </View>
            <Avatar.Image size={84} style={styles.imageStyle} source={require('../assets/images/logo.png')} />
        </Appbar.Header>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#C51221',
        height: 102,
    },
    imageStyle: {
        backgroundColor: '#C51221',
        position: 'absolute',
        right: 0
    },
    titleText: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        right: '35%',
        position: 'absolute',
    },
});
