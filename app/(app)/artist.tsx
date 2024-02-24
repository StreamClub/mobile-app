import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { getArtist } from '../../apiCalls/artists'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { useLocalSearchParams } from 'expo-router'
import {
    ArtistDetailScreen,
    ArtistDetails,
} from '../../components/ArtistDetails/ArtistDetailScreen'
import { ArtistDetailsParams } from '../../apiCalls/params/content/ArtistDetailParams'

export default function Serie() {
    const session = useSession()
    const [artist, setArtist] = useState<ArtistDetails>({
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
    })
    const params = useLocalSearchParams<ArtistDetailsParams>()
    const [artistLoaded, setArtistLoaded] = useState(false)
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
        setArtistLoaded(true)
    }

    const onFailure = (error: any) => {
        console.log(error)
    }

    useEffect(() => {
        getArtist(session, artistId, onSuccess, onFailure)
    }, [])

    return (
        <View style={styles.container}>
            {artistLoaded ? (
                <ArtistDetailScreen artist={artist} />
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
})
