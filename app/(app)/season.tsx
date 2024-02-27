import React from 'react';
import { View, StyleSheet } from "react-native";
import { colors } from "../../assets";
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from "react";
import { useSession } from '../../context/ctx';
import { getSeason } from '../../apiCalls/series';
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent';
import { SeasonDetailScreen } from '../../screens/SeasonDetailScreen';
import { useSeasonDetail } from '../../hooks/useSeasonDetails';
import { SeasonHeader } from '../../components/SeasonDetails/SeasonHeader';

export type SeasonDetailsParams = {
    seriesId: string;
    seasonId: string;
    platforms: string;
};

export default function Season() {
    const session = useSession();
    const params = useLocalSearchParams<SeasonDetailsParams>();
    const {season, setSeason} = useSeasonDetail();
    const [seasonLoaded, setSeasonLoaded] = useState(false)

    const onSuccess = (response: any) => {
        setSeason(response.data, Number(params.seriesId));
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

    if(!season) {
        return null;
    }

    return(
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <SeasonHeader seen={season.seen} seasonId={season.id} seriesId={season.seriesId} />
                    ) ,
                }}
            />
            {seasonLoaded && season ? 
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
