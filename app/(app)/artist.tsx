import { View, StyleSheet, Text} from 'react-native';
import React from 'react';
import { useSession } from '../../context/ctx';
import { useState, useEffect } from "react";
import { colors } from "../../assets";
import { getSerie } from '../../apiCalls/series';
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { Season, SerieDetailScreen } from '../../screens/SerieDetailScreen';
import { SeasonDetailsParams } from './season';
import { Actor } from '../../components/CastList';

export type ArtistDetailsParams = {
    id: string;
};

export default function Serie() {
    const session = useSession();
    const [artist, setArtist] = useState({
        id: 1136406,
        name: "",
        poster: "",
        birthDate: "",
        birthPlace: "",
        deathDate: null,
        gender: "",
        knownFor: "",
        Credits: [''],
    })
    const params = useLocalSearchParams<ArtistDetailsParams>();
    const [artistLoaded, setArtistLoaded] = useState(false)
    const artistId = params.id

    const onSuccess = (response: any) => {
        const platforms = response.data.platforms;
        const seasons = response.data.seasons;
        const cast = response.data.cast;
        const artistData = {
            id: response.data.id,
            name: response.data.name,
            poster: response.data.poster,
            birthDate: response.data.birthDate,
            birthPlace: response.data.birthPlace,
            deathDate: response.data.deathDate,
            gender: response.data.gender,
            knownFor: response.data.knownFor,
            Credits: response.data.Credits,
        };
        setArtist(artistData);
        setArtistLoaded(true);
    }

    const onFailure = (error: any) => {
        console.log(error);
    }

    useEffect(() => {
        // getArtist(session, artistId, onSuccess, onFailure)
    }, []);

    const onSeasonPress = (season: Season) => {
        const params: SeasonDetailsParams = {
            seasonId: season.id.toString(),
            seriesId: season.seriesId.toString()
        }
        router.push({ pathname: '/season', params});
    }

    return (
        <View style={styles.container}>
            {artistLoaded ? 
                // <ArtistDetailScreen artist={artist} onSeasonPress={onSeasonPress}/> 
                <Text>Pantalla de artista</Text>
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