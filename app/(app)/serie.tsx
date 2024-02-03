import { View, StyleSheet } from 'react-native';
import React from 'react';
import { useSession } from '../../context/ctx';
import { useState, useEffect } from "react";
import { colors } from "../../assets";
import { getSerie } from '../../apiCalls/series';
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent';

import { useLocalSearchParams } from 'expo-router';
import { Season, SerieDetailScreen } from '../../screens/SerieDetailScreen';

export type SerieDetailsParams = {
    id: string;
  };

export default function Serie() {
    const session = useSession();
    const [serie, setSerie] = useState({
        overview: '',
        poster: '',
        backdrop: '',
        genres: [''],
        platforms: [''],
        title: '',
        status: '',
        creators: [''],
        lastAirDate: new Date(),
        totalEpisodes: 0,
        totalSeasons: 0,
        releaseDate: new Date(),
        seasons: []
    })
    const params = useLocalSearchParams<SerieDetailsParams>();
    const [serieLoaded, setSerieLoaded] = useState(false)
    const serieId = params.id

    const onSuccess = (response: any) => {
        const platforms = response.data.platforms;
        const seasons = response.data.seasons;
        const serieData = {
            overview: response.data.overview,
            poster: response.data.poster,
            backdrop: response.data.backdrop,
            genres: response.data.genres,
            platforms: platforms ? platforms.map(platform => platform.logoPath) : [],
            title: response.data.title,
            status: response.data.status,
            creators: response.data.createdBy,
            lastAirDate: new Date(response.data.lastAirDate),
            totalEpisodes: response.data.numberOfEpisodes,
            totalSeasons: response.data.numberOfSeasons,
            releaseDate: new Date(response.data.releaseDate),
            seasons: seasons ? seasons.map((season: Season) => ({
                "id": season.id,
                "name": season.name,
                "poster": season.poster,
                "airDate": new Date(season.airDate)
            })) : []
        };
        setSerie(serieData);
        setSerieLoaded(true);
    }

    const onFailure = (error: any) => {
        console.log(error);
    }

    useEffect(() => {
        const loadMovie = async () => {
          await getSerie(session, serieId, onSuccess, onFailure)
        };
        loadMovie();
    }, []);

    return (
        <View style={styles.container}>
            {serieLoaded ? 
                <SerieDetailScreen serie={serie} /> : 
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