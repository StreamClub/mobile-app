import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../assets'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useEffect } from 'react'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { SeasonDetailScreen } from '../../screens/SeasonDetailScreen'
// import { useSeasonDetail } from '../../hooks/useSeasonDetails'
import { Platform } from '../../entities/Details/Platform'
import { SeasonHeader } from '../../components/Series/SeasonDetails/SeasonHeader'
import { useGetSeason } from '../../apiCalls/series'
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { SeasonDetail } from '../../entities/Details/Series/SeasonDetail'
import { useAppDispatch } from '../../hooks/redux/useAppDispatch'
import { setFocusedSeason } from '../../store/slices/searchContentSlice'

export type SeasonDetailsParams = {
    seriesId: string
    seasonId: string
    platforms: string
}

export default function Season() {
    const params = useLocalSearchParams<SeasonDetailsParams>()
    const seriesId = params.seriesId
    // const { season, setSeason } = useSeasonDetail()

    const [seasonData, setSeasonData] = useState<SeasonDetail>()

    // const { focusedSeason: season } = useAppSelector((state) => state.searchContent)
    const dispatch = useAppDispatch();

    const {getSeason, loading} = useGetSeason();
    const platforms = JSON.parse(params.platforms).map((item: any) =>
        Platform.fromJson(item)
    )

    const onSuccess = (response: any) => {

        const data = response.data
        const season = SeasonDetail.fromJson(response.data, Number(seriesId))
        // redux params
        const setFocusedSeasonParams = {
            seriesId: Number(seriesId),
            seasonId: Number(data.id),
            seen: season.seen,
            episodes: season.episodes.map((episode) => ({
                episodeId: episode.episodeId as number,
                seen: episode.seen? true : false,
            })),
        }
        
        dispatch(setFocusedSeason(setFocusedSeasonParams))
        
        // all params (used for render the screen)
        setSeasonData(season)
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
                    headerRight: () => <SeasonHeader/>,
                }}
            />
            {!loading? (
                <SeasonDetailScreen season={seasonData} platforms={platforms} />
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
