import React from 'react';
import {  StyleSheet, Dimensions, ScrollView } from 'react-native';
import { colors } from "../../assets";
import { ArtistFilmografy } from './ArtistFilmografy';
import { ArtistBasicInfo, ArtistBasicInfoParams } from './ArtistBasicInfo';
import { ExternalIds } from '../Types/ExternalId';
import { CreditsEntry } from '../Types/Credits';

import { Credits } from '../Types/Credits';

const screenWidth = Dimensions.get('window').width;

export type ArtistDetails = {
    id: number,
    name: string,
    poster: string,
    birthDate: string,
    birthPlace: string,
    deathDate: string,
    gender: string,
    knownFor: string,
    credits: Credits
    externalIds: ExternalIds
}

type ArtistDetailScreenParams = {
    artist: ArtistDetails
    onPressCreditsEntry: (entry: CreditsEntry) => void
}

export const ArtistDetailScreen = (params: ArtistDetailScreenParams) => {
    const artistBasicInfo: ArtistBasicInfoParams = {
        name: params.artist.name,
        poster: params.artist.poster,
        birthDate: params.artist.birthDate,
        birthPlace: params.artist.birthPlace,
        deathDate: params.artist.deathDate,
        externalIds: params.artist.externalIds,
        style: {marginTop: 15, marginBottom: 15}
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
            <ArtistBasicInfo {...artistBasicInfo}/>
            <ArtistFilmografy credits={params.artist.credits} onPressCreditsEntry= {params.onPressCreditsEntry}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cast: {
        marginLeft: 20,
        marginBottom: 20
    },
    contentContainerStyle: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: screenWidth,
    },
    backdropImage: {
        width: screenWidth,
        height: 210
    },
    textOverlay: {
        position: 'absolute',
        top: 10,
        left: 5,
        alignSelf: 'center',
    },
    imageOverlay: {
        position: 'absolute',
        top: 90,
        alignSelf: 'flex-end'
    },
    posterImage: {
        width: 170,
        height: 255,
        marginRight: 10,
        borderWidth: 2,
        borderColor: colors.primaryBlack,
    },
    darkness: {
        backgroundColor: colors.secondaryWhite + '85',
        width: screenWidth
    },
    director: {
        position: 'absolute',
        top: 90,
        alignSelf: 'flex-start',
        marginLeft: 10,
        flexDirection: 'row'
    },
    runtime: {
        position: 'absolute',
        top: 125,
        alignSelf: 'flex-start',
        marginLeft: 10,
        flexDirection: 'row'
    },
    platforms: {
        marginLeft: 20,
        marginTop: 5,
        height: 160,
        width: 180,
        justifyContent: 'center'
    },
    platformImage: {
        width: 50,
        height: 50,
        margin: 5,
        borderWidth: 2,
        borderColor: colors.primaryBlack,
        borderRadius: 10,
    },
    divider: {
        backgroundColor: colors.primaryBlack,
        width: 150,
        height: 1,
        margin: 10,
    },
    buttom: {
        marginTop: 20
    },
    description: {
        margin: 20,
        flex: 1,
        alignItems: 'center'
    },
    seasons: {
        marginLeft: 20,
        marginBottom: 20
    },
    seasonImage: {
        width: 150,
        height: 230,
        borderRadius: 20
    },
    nextEpisode: {
        width: 350,
        height: 150,
        backgroundColor: colors.primarySkyBlue,
        margin: 20,
        borderRadius: 20,
        flexDirection: 'row',
        flex: 1
    },
    episodePhoto: {
        flex: 1,
        margin: 10,
        borderRadius: 20
    }
});
