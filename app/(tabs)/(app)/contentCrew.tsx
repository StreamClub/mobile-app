import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSession } from '../../../context/ctx'
import { useState, useEffect } from 'react'
import { colors } from '../../../assets'
import { LoadingComponent } from '../../../components/BasicComponents/LoadingComponent'
import { Stack } from 'expo-router'
import { getSeenContentParams, useGetSeenContent } from '../../../apiCalls/content'
import { SeenContentEntry } from '../../../components/Types/SeenContentEntry'
import { SeenContentListScreen, SeenContentListScreenParams } from '../../../components/SeenContent/SeenContentListScreen'
import { ContentDetailsParams } from '../../../apiCalls/params/content/ContentDetailsParams'
import { ContentType } from '../../../components/Types/ContentType'
import { router } from 'expo-router'

export default function ContentCrew() {
    const session = useSession()
    const userId = session?.userId

    const [contentCast, setContentCast] = useState<ContentCrewEntry[]>([])
    const [contentCrew, setContentCrew] = useState<ContentCrewEntry[]>([])
    const {getContentCrew, loading: loadingContentCrew} = useGetContentCrew();

    const onSuccessGetContentCrew = (response: any) => {
        const _contentCast: ContentCrewEntry[] = response.data.results.cast
        const _contentCrew: ContentCrewEntry[] = response.data.results.crew

        setContentCast(_contentCast)
        setContentCrew(_contentCrew)
    }
    
    useEffect(() => {
        const seenContentParams: getSeenContentParams = {
            userId: userId ? userId : 0,
            page: 1,
            pageSize: 10,
        }
        getSeenContent(seenContentParams, onSuccessGetSeenContent)
    }, [])

    const onPressSeenContentEntry = (entry: SeenContentEntry) => {
        const contentScreenParams: ContentDetailsParams = {
            id: entry.id.toString(),
        }

        //TODO: Refactorizar para usar o bien entities o bien un enum
        const pathname = entry.contentType === ContentType.Movie ? '/movie' : '/serie'
        router.push({ pathname: pathname, params: contentScreenParams })
    }

    const seenContentListScreenParams: SeenContentListScreenParams = {
        seenContentList: seenContent,
        onPressSeenContentEntry: onPressSeenContentEntry,
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options ={{
                    
                }}
            />
            {loadingSeenContent ? 
                <LoadingComponent />
            :
                <FullContentCrewScreen {...seenContentListScreenParams}/>   
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
    iconsStyle: {
        height: 35,
        aspectRatio: 495 / 512,
    },
})
