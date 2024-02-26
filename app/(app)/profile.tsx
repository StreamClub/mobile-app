import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { WatchlistEntry } from '../../components/Types/Watchlist'
import { getWatchlist, getWatchlistParams } from '../../apiCalls/profile'
import { ProfileScreen, ProfileScreenParams } from '../../components/Profile/ProfileScreen'

export default function Profile() {
    const session = useSession()
    const userId = session?.userId

    const [loading, setLoading] = useState(true)
    const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([])

    const profileParams: ProfileScreenParams = {
        watchlist: watchlist,
    }

    const onSuccess = (response: any) => {
        const watchlist:WatchlistEntry[] = response.data.results
        setWatchlist(watchlist)
        setLoading(false)
    }

    const onFailure = (error: any) => {
        console.log(error)
    }

    useEffect(() => {
        const params: getWatchlistParams = {
            userId: userId? userId : 0,
        }
        getWatchlist(session, params, onSuccess, onFailure)
    }, [])

    return (
        <View style={styles.container}>
            {/* <Stack.Screen
                options={{
                    headerRight: () => (
                        <Pressable
                            onPress={() =>
                                console.log('icon Press')
                            }
                        >
                            <WatchlistButton
                                iconStyle={styles.iconsStyle}
                                watchlistLoading={loading}
                                inWatchlist={inWatchlist}
                            />
                        </Pressable>
                    ),
                }}
            /> */}
            {loading ? 
                <LoadingComponent />
            :
                <ProfileScreen {...profileParams}/>   
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
