import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { useLocalSearchParams } from 'expo-router'
import {
    ArtistDetailScreen,
    ArtistDetails,
} from '../../components/ArtistDetails/ArtistDetailScreen'
import { ArtistDetailsParams } from '../../apiCalls/params/content/ArtistDetailParams'
import { useGetArtist } from '../../apiCalls/artists'
import { CreditsEntry } from '../../components/Types/Credits'
import { ContentDetailsParams } from '../../apiCalls/params/content/ContentDetailsParams'
import { router } from 'expo-router'

export default function Serie() {
    const emptyArtist = {
        id: 1136406,
        name: '',
        poster: '',
        birthDate: '',
        birthPlace: '',
        deathDate: '',
        gender: '',
        knownFor: '',
        credits: {
            cast: [],
            crew: [],
        },
        externalIds: {
            instagramId: null,
            twitterId: null,
        }
    }
    const {getArtist, loading} = useGetArtist();
    const [artist, setArtist] = useState<ArtistDetails>(emptyArtist)
    const params = useLocalSearchParams<ArtistDetailsParams>()
    const artistId = params.id

    const onSuccess = (response: any) => {
        const artistData: ArtistDetails = {
            id: response.data.id,
            name: response.data.name,
            poster: response.data.poster,
            birthDate: response.data.birthDate,
            birthPlace: response.data.birthPlace,
            deathDate: response.data.deathDate,
            gender: response.data.gender,
            knownFor: response.data.knownFor,
            credits: {
                cast: response.data.credits.cast,
                crew: response.data.credits.crew,
            },
            externalIds: {
                instagramId: response.data.externalIds.instagramId,
                twitterId: response.data.externalIds.twitterId,
            }
        }
        setArtist(artistData)
    }

    useEffect(() => {
        getArtist(artistId, onSuccess)
    }, [])

    const onPressCreditsEntry = (entry: CreditsEntry) => {
        const contentScreenParams: ContentDetailsParams = {
            id: entry.id.toString(),
        }

        //TODO: Refactorizar para usar o bien entities o bien un enum
        const pathname = entry.mediaType === 'movie' ? '/movie' : '/serie'
        router.push({ pathname: pathname, params: contentScreenParams })
    }

    return (
        <View style={styles.container}>
            {loading || (artist == emptyArtist) ? (
                <LoadingComponent />
            ) : (
                <ArtistDetailScreen artist={artist} onPressCreditsEntry={onPressCreditsEntry} />
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
})
