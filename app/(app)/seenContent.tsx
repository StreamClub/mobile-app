import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { Stack } from 'expo-router'
import { getSeenContentParams, useGetSeenContent } from '../../apiCalls/content'
import { SeenContentListEntry } from '../../entities/SeenContent/SeenContentListEntry'
import { SeenSeriesListEntry } from '../../entities/SeenContent/SeenSeriesListEntry'
import { SeenContentEntry } from '../../components/Types/SeenContentEntry'
import { SeenContentListScreen } from '../../components/SeenContent/SeenContentListScreen'

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

    return (
        <View style={styles.container}>
            <Stack.Screen
                options ={{
                    
                }}
            />
            {loadingSeenContent ? 
                <LoadingComponent />
            :
                <SeenContentListScreen seenContentList={seenContent}/>   
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
