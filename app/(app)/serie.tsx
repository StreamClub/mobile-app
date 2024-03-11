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

export default function Serie() {
    const { series, setSeries } = useSeriesDetails()
    const params = useLocalSearchParams<ContentDetailsParams>()
    const serieId = params.id
    const { getSeries, loading } = useGetSeries();

    const onSuccess = (response: any) => {
        setSeries(response.data)
    }

    useEffect(() => {
        const loadSerie = async () => {
            await getSeries(serieId, onSuccess)
        }
        loadSerie()
    }, [])

    const onRecommendPress = (series: Content) => {
        const newParams: ContentDetailsParams = {
            id: series.id.toString(),
        }
        router.replace({ pathname: '/serie', params: newParams })
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
                    onRecommendPress={onRecommendPress}
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
