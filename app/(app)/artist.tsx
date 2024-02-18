import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useSession } from '../../context/ctx';
import { useState, useEffect } from "react";
import { colors } from "../../assets";
import { getArtist } from '../../apiCalls/artists';
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { ArtistDetailScreen, ArtistDetails } from '../../screens/ArtistDetailScreen';
import { SeasonDetailsParams } from './season';
import { Actor } from '../../components/CastList';

export type ArtistDetailsParams = {
    id: string;
};

export default function Serie() {
    const session = useSession();
    const [artist, setArtist] = useState<ArtistDetails>({
        id: 1136406,
        name: "",
        poster: "",
        birthDate: "",
        birthPlace: "",
        deathDate: null,
        gender: "",
        knownFor: "",
        // Credits: [''],
    })
    const params = useLocalSearchParams<ArtistDetailsParams>();
    const [artistLoaded, setArtistLoaded] = useState(false)
    const artistId = params.id

    const onSuccess = (response: any) => {
        const artistData: ArtistDetails = {
            id: response.data.id,
            name: response.data.name,
            poster: response.data.poster,
            birthDate: response.data.birthDate,
            birthPlace: response.data.birthPlace,
            deathDate: response.data.deathDate,
            gender: response.data.gender,
            knownFor: response.data.knownFor,
            // Credits: response.data.Credits,
        };
        setArtist(artistData);
        setArtistLoaded(true);
    }

    const onFailure = (error: any) => {
        console.log(error);
    }

    useEffect(() => {
        getArtist(session, artistId, onSuccess, onFailure)
    }, []);

    return (
        <View style={styles.container}>
            {artistLoaded ? 
                <ArtistDetailScreen artist={artist}/> 
                : 
                <LoadingComponent />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondaryWhite,
    },
});