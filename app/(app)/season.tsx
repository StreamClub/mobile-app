import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../assets'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { SeasonDetailScreen } from '../../screens/SeasonDetailScreen'
import { useSeasonDetail } from '../../hooks/useSeasonDetails'
import { Platform } from '../../entities/Details/Platform'
import { SeasonHeader } from '../../components/Series/SeasonDetails/SeasonHeader'
import { useGetSeason } from '../../apiCalls/series'

export type SeasonDetailsParams = {
    seriesId: string
    seasonId: string
    platforms: string
}

export default function Season() {
    const params = useLocalSearchParams<SeasonDetailsParams>()
    const { season, setSeason } = useSeasonDetail()
    const {getSeason, loading} = useGetSeason();
    const platforms = JSON.parse(params.platforms).map((item: any) =>
        Platform.fromJson(item)
    )

    const onSuccess = (response: any) => {
        setSeason(response.data, Number(params.seriesId))
    }

    useEffect(() => {
        const loadSerie = async () => {
            await getSeason(
                params.seriesId,
                params.seasonId,
                onSuccess
            )
        }
        loadSerie()
    }, [])

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerRight: () => <SeasonHeader season={season} />,
                }}
            />
            {!loading && season ? (
                <SeasonDetailScreen season={season} platforms={platforms} />
            ) : (
                <LoadingComponent />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.secondaryWhite,
    },
})
