import React from 'react';
import {  StyleSheet, ScrollView } from 'react-native';
import { WatchlistEntry } from '../Types/Watchlist';
import { Watchlist } from '../Watchlist';

export type ProfileScreenParams = {
    watchlist: WatchlistEntry[];
}

export const ProfileScreen = (params: ProfileScreenParams) => {
    return (
        <ScrollView style={styles.container}>
            <Watchlist watchlist={params.watchlist}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
});
