import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { WatchlistEntry } from '../../components/Types/Watchlist'
import { useGetWatchlist } from '../../apiCalls/profile'
import { ProfileScreen, ProfileScreenParams } from '../../components/Profile/ProfileScreen'

export default function Profile() {
    const {getWatchlist, loading} = useGetWatchlist();
    const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([])

    const profileParams: ProfileScreenParams = {
        watchlist: watchlist,
    }

    const onSuccess = (response: any) => {
        const watchlist:WatchlistEntry[] = response.data.results
        setWatchlist(watchlist)
    }

    useEffect(() => {
        getWatchlist(onSuccess)
    }, [])

    return (
        <View style={styles.container}>
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
