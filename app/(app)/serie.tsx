import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { getSerie } from '../../apiCalls/series'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { Stack, router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import { SerieDetailScreen } from '../../screens/SerieDetailScreen'
import { SeasonDetailsParams } from './season'
import { Content } from '../../components/RecomendsList'
import { IconButton } from 'react-native-paper'
import { handleSeriesWatchlistPress } from '../../utils/handleWatchlistPress'
import { WatchlistButton } from '../../components/BasicComponents/WatchlistButton'
import { ContentDetailsParams } from '../../apiCalls/params/content/ContentDetailsParams'
import { useSeriesDetails } from '../../hooks/useSeriesDetails'
import { Season } from '../../entities/Details/Series/Season'
import { Platform } from '../../entities/Details/Platform'

export default function Serie() {
    const session = useSession()
    const {series, setSeries} = useSeriesDetails()
    const params = useLocalSearchParams<ContentDetailsParams>()
    const [serieLoaded, setSerieLoaded] = useState(false)
    const [inWatchlist, setInWatchlist] = useState(series? series.inWatchlist : false)
    const [loading, setLoading] = useState(false)
    const serieId = params.id

    const onSuccess = (response: any) => {
        setSeries(response.data)
        setInWatchlist(series? series.inWatchlist : false)
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

    const onSeasonPress = (season: Season, platforms: Platform[]) => {
        const params: SeasonDetailsParams = {
            seasonId: season.id.toString(),
            seriesId: season.seriesId.toString(),
            platforms: JSON.stringify(platforms)
        }
        router.push({ pathname: '/season', params })
    }

    const onRedommendPress = (series: Content) => {
        const newParams: ContentDetailsParams = {
            id: series.id.toString(),
        }
        router.replace({ pathname: '/serie', params: newParams })
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <>
                            <IconButton
                                onPress={() => console.log('hola')}
                                icon="plus-circle-outline"
                                size={40}
                            />
                            <Pressable
                                onPress={() => series?
                                    handleSeriesWatchlistPress(
                                        series.id,
                                        setLoading,
                                        setInWatchlist,
                                        inWatchlist,
                                        session
                                    ) : console.log("Series did not load")
                                }
                            >
                                <WatchlistButton
                                    iconStyle={styles.iconsStyle}
                                    watchlistLoading={loading}
                                    inWatchlist={inWatchlist}
                                />
                            </Pressable>
                        </>
                    ),
                }}
            />
            {serieLoaded && series ? (
                <SerieDetailScreen
                    series={series}
                    onSeasonPress={onSeasonPress}
                    onRecommendPress={onRedommendPress}
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
