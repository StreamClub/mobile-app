import React from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from "../../assets";
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from "react";
import { useSession } from '../../context/ctx';
import { getSeason } from '../../apiCalls/series';
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent';
import { SeasonDetailScreen } from '../../screens/SeasonDetailScreen';
import { Episode } from '../../components/Types/Episodes';

export type SeasonDetailsParams = {
    seriesId: string;
    seasonId: string;
    platforms: string;
};

export default function Season() {
    const session = useSession();
    const params = useLocalSearchParams<SeasonDetailsParams>();
    const platforms = JSON.parse(params.platforms);
    const [season, setSeason] = useState({
        airDate: new Date(),
        name: '',
        overview: '',
        poster: '',
        episodes: []
    });
    const [seasonLoaded, setSeasonLoaded] = useState(false)

    const onSuccess = (response: any) => {
        const episodes = response.data.episodes;
        const seasonData = {
            airDate: new Date(response.data.airDate),
            name: response.data.name,
            overview: response.data.overview,
            poster: response.data.poster,
            episodes: episodes? episodes.map((episode: Episode) => ({
                "airDate": new Date(episode.airDate),
                "episodeId": episode.episodeId,
                "name": episode.name,
                "overview": episode.overview,
                "runtime": episode.runtime,
                "poster": episode.poster,
                "platforms": platforms
            })) : []
        };
        setSeason(seasonData);
        setSeasonLoaded(true);
    }

    const onFailure = (error: any) => {
        console.log(error);
    }

    useEffect(() => {
        const loadSerie = async () => {
          await getSeason(session, params.seriesId, params.seasonId, onSuccess, onFailure)
        };
        loadSerie();
    }, []);

    return(
        <View style={styles.container}>
            {seasonLoaded ? 
                <SeasonDetailScreen season={season}/> : 
                <LoadingComponent />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.secondaryWhite,
    },
});
