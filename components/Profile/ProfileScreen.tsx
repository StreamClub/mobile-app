import React from 'react';
import {  StyleSheet, ScrollView } from 'react-native';
import { WatchlistEntry } from '../Types/Watchlist';
import { Watchlist } from '../Watchlist';
import { ProfileHeader, ProfileHeaderParams } from './ProfileHeader';
import { colors } from '../../assets';

export type ProfileScreenParams = {
    watchlist: WatchlistEntry[];
    profileHeader: ProfileHeaderParams;
}

export const ProfileScreen = (params: ProfileScreenParams) => {
    
    return (
        <ScrollView style={styles.container}>
            <ProfileHeader {...params.profileHeader}/>
            <Watchlist watchlist={params.watchlist}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondaryWhite,
    },
});
