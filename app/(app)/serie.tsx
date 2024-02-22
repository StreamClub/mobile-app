import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { getSerie } from '../../apiCalls/series'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { Stack, router } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import { Season, SerieDetailScreen } from '../../screens/SerieDetailScreen'
import { SeasonDetailsParams } from './season'
import { Actor } from '../../components/CastList'
import { Content } from '../../components/RecomendsList'
import { IconButton } from 'react-native-paper'
import { handleSeriesWatchlistPress } from '../../utils/handleWatchlistPress'
import { WatchlistButton } from '../../components/BasicComponents/WatchlistButton'
import { ContentDetailsParams } from '../../apiCalls/params/content/ContentDetailsParams'
import { Platform } from '../../components/Types/Platforms'

export default function Serie() {
    const session = useSession()
    const [serie, setSerie] = useState({
        id: '',
        overview: '',
        poster: '',
        backdrop: '',
        genres: [''],
        platforms: [],
        title: '',
        status: '',
        creators: [''],
        lastAirDate: new Date(),
        totalEpisodes: 0,
        totalSeasons: 0,
        releaseDate: new Date(),
        seasons: [],
        nextEpisode: { photo: '', airDate: new Date(), name: '' },
        cast: [],
        similar: [],
        inWatchlist: false
    })
    const params = useLocalSearchParams<ContentDetailsParams>()
    const [serieLoaded, setSerieLoaded] = useState(false)
    const [inWatchlist, setInWatchlist] = useState(serie.inWatchlist)
    const [loading, setLoading] = useState(false)
    const serieId = params.id

    const onSuccess = (response: any) => {
        const platforms = response.data.platforms
        const seasons = response.data.seasons
        const cast = response.data.cast
        const similar = response.data.similar
        const serieData = {
            id: String(response.data.id),
            overview: response.data.overview,
            poster: response.data.poster,
            backdrop: response.data.backdrop,
            genres: response.data.genres,
            platforms: platforms
                ? platforms.map((platform: Platform) => ({
                    logoPath: platform.logoPath,
                    providerName: platform.providerName,
                    link: platform.link,
                }))
                : [],
            title: response.data.title,
            status: response.data.status,
            creators: response.data.createdBy,
            lastAirDate: new Date(response.data.lastAirDate),
            totalEpisodes: response.data.numberOfEpisodes,
            totalSeasons: response.data.numberOfSeasons,
            releaseDate: new Date(response.data.releaseDate),
            seasons: seasons
                ? seasons.map((season: Season) => ({
                      id: season.id,
                      name: season.name,
                      poster: season.poster,
                      airDate: new Date(season.airDate),
                      seriesId: response.data.id,
                  }))
                : [],
            nextEpisode: {
                photo: response.data.nextEpisode.photo,
                airDate: new Date(response.data.nextEpisode.airDate),
                name: response.data.nextEpisode.name,
            },
            cast: cast
                ? cast.map((actor: Actor) => ({
                      name: actor.name,
                      profilePath: actor.profilePath,
                      character: actor.character,
                  }))
                : [],
            similar: similar
                ? similar.map((series: Content) => ({
                      id: series.id,
                      title: series.title,
                      posterPath: series.posterPath,
                      releaseDate: new Date(series.releaseDate),
                  }))
                : [],
            inWatchlist: response.data.inWatchlist,
        }
        setSerie(serieData)
        setInWatchlist(serieData.inWatchlist)
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

    const onSeasonPress = (season: Season) => {
        const params: SeasonDetailsParams = {
            seasonId: season.id.toString(),
            seriesId: season.seriesId.toString(),
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
                                onPress={() =>
                                    handleSeriesWatchlistPress(
                                        serie.id,
                                        setLoading,
                                        setInWatchlist,
                                        inWatchlist,
                                        session
                                    )
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
            {serieLoaded ? (
                <SerieDetailScreen
                    serie={serie}
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
