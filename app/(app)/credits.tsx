import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { Stack, useLocalSearchParams, router } from 'expo-router'
import { useGetCredits, getCreditsParams } from '../../apiCalls/content'
import { ContentType } from '../../components/Types/ContentType'
import { CreditsEntry, CastEntry, CrewEntry } from '../../components/Types/Credits'
import { CreditsScreen, CreditsScreenParams } from '../../components/Credits/CreditsScreen'
import { ListEntry } from '../../components/BasicComponents/List'
import { ArtistDetailsParams } from '../../apiCalls/params/content/ArtistDetailParams'

export type CreditsParams = {
    contentId: string,
    contentType: ContentType,
}

export default function Credits() {
    const params = useLocalSearchParams<CreditsParams>()

    const [cast, setCast] = useState<ListEntry[]>([])
    const [crew, setCrew] = useState<ListEntry[]>([])
    const {getCredits, loading: loadingCredits} = useGetCredits();

    const onSuccessGetCredits = (response: any) => {
        const _castCredits: CastEntry[] = response.data.cast
        const _crewCredits: CrewEntry[] = response.data.crew
        const _cast: ListEntry[] = []
        const _crew: ListEntry[] = []
        
        _castCredits.forEach((castEntry: CastEntry) => {
            _cast.push({
                itemObject: castEntry,
                tmdbResource: castEntry.poster,
            })
        })
        _crewCredits.forEach((crewEntry: CrewEntry) => {
            _crew.push({
                itemObject: crewEntry,
                tmdbResource: crewEntry.poster,
            })
        })

        setCast(_cast)
        setCrew(_crew)
    }
    
    useEffect(() => {
        const getCreditsParams: getCreditsParams = {
            contentId: params.contentId,
            contentType: params.contentType,
        }

        getCredits(getCreditsParams, onSuccessGetCredits)
    }, [])

    const onPressCreditsEntry = (entry: CreditsEntry) => {
        const artistDetailParams: ArtistDetailsParams = {
            id: entry.id.toString(),
        }

        router.push({ pathname: '/artist', params: artistDetailParams })
    }

    const creditsParams: CreditsScreenParams = {
        cast: cast,
        crew: crew,
        onPressCreditsEntry: onPressCreditsEntry,
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options ={{
                    
                }}
            />
            {loadingCredits ? 
                <LoadingComponent />
            :
                <CreditsScreen {...creditsParams}/>   
            }
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
