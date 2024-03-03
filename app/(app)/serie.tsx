import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { getSerie } from '../../apiCalls/series'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { Stack, router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import { SeriesDetailScreen } from '../../components/SeriesDetails/SeriesDetailScreen'
import { Content } from '../../components/RecommendsList'
import { ContentDetailsParams } from '../../apiCalls/params/content/ContentDetailsParams'
import { useSeriesDetails } from '../../hooks/useSeriesDetails'
import { SeriesHeader } from '../../components/SeriesDetails/SeriesHeader'

export default function Serie() {
    const session = useSession()
    const { series, setSeries } = useSeriesDetails()
    const params = useLocalSearchParams<ContentDetailsParams>()
    const [serieLoaded, setSerieLoaded] = useState(false)
    const serieId = params.id

    const onSuccess = (response: any) => {
        setSeries(response.data)
        setSerieLoaded(true)
    }

    const onFailure = (error: any) => {
        console.log(error)
    }

    useEffect(() => {
        const loadSerie = async () => {
            await getSerie(session, serieId, onSuccess, onFailure)
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
            {serieLoaded && series ? (
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
