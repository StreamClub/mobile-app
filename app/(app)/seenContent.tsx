import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { Stack, useLocalSearchParams } from 'expo-router'
import { getSeenContentParams, useGetSeenContent } from '../../apiCalls/content'
import { SeenContentEntry } from '../../components/Types/SeenContentEntry'
import { SeenContentListScreen, SeenContentListScreenParams } from '../../components/SeenContent/SeenContentListScreen'
import { ContentDetailsParams } from '../../apiCalls/params/content/ContentDetailsParams'
import { ContentType } from '../../components/Types/ContentType'
import { router } from 'expo-router'
import { useSeenContent } from '../../hooks/useSeenContent'
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { setUserId } from '../../store/slices/seenContentSlice'
import { useAppDispatch } from '../../hooks/redux/useAppDispatch'

export type SeenContentParams = {
    userId?: string
}

export default function SeenContent() {
    const params = useLocalSearchParams<SeenContentParams>();
    const session = useSession();
    const userId = params.userId? +params.userId : session?.userId ? session.userId : 0;

    const { loadingFirstPage } = useAppSelector((state) => state.seenContent)
    const { loadSeenContent } = useSeenContent() 
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log("[SeenContent] setting userId: ", userId)
        dispatch(setUserId(userId))
        loadSeenContent(userId)
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
        onPressSeenContentEntry: onPressSeenContentEntry,
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options ={{
                    
                }}
            />
            {loadingFirstPage ? 
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
