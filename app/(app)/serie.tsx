import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { colors } from '../../assets'
import { useGetSeries } from '../../apiCalls/series'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { Stack, router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import { Content } from '../../components/RecommendsList'
import { ContentDetailsParams } from '../../apiCalls/params/content/ContentDetailsParams'
import { useSeriesDetails } from '../../hooks/useSeriesDetails'
import { SeriesHeader } from '../../components/Series/SeriesDetails/SeriesHeader'
import { SeriesDetailScreen } from '../../components/Series/SeriesDetails/SeriesDetailScreen'
import { ContentType } from '../../components/Types/ContentType'
import { useAppDispatch } from '../../hooks/redux/useAppDispatch'
import { setFocusedEntry } from '../../store/slices/searchContentSlice'
import { SERIES_NAME } from '../../constants'


export default function Serie() {
    const { series, setSeries } = useSeriesDetails()
    const params = useLocalSearchParams<ContentDetailsParams>()
    const serieId = params.id
    const { getSeries, loading } = useGetSeries();
    const dispatch = useAppDispatch();


    const onSuccess = (response: any) => {
        const series = response.data
        setSeries(series)
        const newFocusedEntry = {id: series.id, seen: series.seen, inWatchlist: series.inWatchlist, type: SERIES_NAME}
        console.log(newFocusedEntry)
        dispatch(setFocusedEntry(newFocusedEntry))
    }

    useEffect(() => {
        getSeries(serieId, onSuccess)
    }, [])

    const onPressFullCredits = () => {
        router.push({ pathname: '/credits', params: { contentId: serieId, contentType: ContentType.Series} })
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerRight: () => <SeriesHeader series={series} />,
                }}
            />
            {!loading && series ? (
                <SeriesDetailScreen
                    series={series}
                    onPressFullCredits={onPressFullCredits}
                />
            ) : (
                <LoadingComponent />
            )}
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
    iconsStyle: {
        height: 35,
        aspectRatio: 495 / 512,
    },
})
