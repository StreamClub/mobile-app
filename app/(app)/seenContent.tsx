import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { Stack } from 'expo-router'
import { getSeenContentParams, useGetSeenContent } from '../../apiCalls/content'
import { SeenContentEntry } from '../../components/Types/SeenContentEntry'
import { SeenContentListScreen, SeenContentListScreenParams } from '../../components/SeenContent/SeenContentListScreen'
import { ContentDetailsParams } from '../../apiCalls/params/content/ContentDetailsParams'
import { ContentType } from '../../components/Types/ContentType'
import { router } from 'expo-router'

export default function SeenContent() {
    const session = useSession()
    const userId = session?.userId

    const [seenContent, setSeenContent] = useState<SeenContentEntry[]>([])
    const {getSeenContent, loading: loadingSeenContent} = useGetSeenContent();

    const onSuccessGetSeenContent = (response: any) => {
        const _seenContent: SeenContentEntry[] = response.data.results

        setSeenContent(_seenContent)
    }

    const onFailure = (error: any) => {
        console.log(error)
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
                <SeenContentListScreen {...seenContentListScreenParams}/>   
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
