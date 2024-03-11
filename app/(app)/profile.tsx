import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { WatchlistEntry } from '../../components/Types/Watchlist'
import { useGetProfile, useGetWatchlist } from '../../apiCalls/profile'
import { getProfileParams } from '../../apiCalls/profile'
import { ProfileScreen, ProfileScreenParams } from '../../components/Profile/ProfileScreen'
import { ProfileHeaderParams } from '../../components/Profile/ProfileHeader'
import { Stack } from 'expo-router'
import { CarouselEntry } from '../../components/BasicComponents/Types/CarouselParams'
import { ServiceEntry } from '../../components/Types/Services'
import { getSeenContentParams, useGetSeenContent } from '../../apiCalls/content'
import { SeenContentEntry } from '../../components/Types/SeenContentEntry'
import { router } from 'expo-router'
import { useSession } from '../../context/ctx'
import { useUserServices } from '../../apiCalls/services'

export default function Profile() {
    const {getWatchlist, loading: loadingWatchlist} = useGetWatchlist();
    const session = useSession()
    const userId = session?.userId
    const {getUserServices, loading: loadingUserServices} = useUserServices();
    const {getProfile, loading: loadingProfileHeader} = useGetProfile();
    const {getSeenContent, loading: loadingSeenContent} = useGetSeenContent();

    const loadingParams = loadingWatchlist || loadingProfileHeader || loadingUserServices || loadingSeenContent
    const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([])
    const [userServices, setUserServices] = useState<CarouselEntry[]>([])
    const [seenContent, setSeenContent] = useState<CarouselEntry[]>([])
    const [profileHeader, setProfileHeader] = useState<ProfileHeaderParams>(
        {
            id: 0,
            email: '',
            userName: '',
            displayName: '',
            friendsCount: 0,
            reviewsCount: 0,
        }
    )
    
    const onPressMoreSeenContent = () => {
        router.push('/seenContent')
    }

    const profileParams: ProfileScreenParams = {
        watchlist: watchlist,
        profileHeader: profileHeader,
        userServices: userServices,
        seenContent: seenContent,
        onPressMoreSeenContent: onPressMoreSeenContent,
    }

    const onSuccessGetWatchlist = (response: any) => {
        const watchlist:WatchlistEntry[] = response.data.results
        setWatchlist(watchlist)
    }

    const onSuccessGetProfile = (response: any) => {
        const profileHeader: ProfileHeaderParams = response.data
        setProfileHeader(profileHeader)
    }

    const onSuccessGetUserServices = (response: any) => {
        const _userServices: ServiceEntry[] = response.data.results
        const _carousel: CarouselEntry[] = []

        _userServices.forEach((service: ServiceEntry) => {
            _carousel.push({
                itemData: service,
                tmdbResource: service.logoPath,
            })
        })
        setUserServices(_carousel)
    }

    const onSuccessGetSeenContent = (response: any) => {
        const _seenContent: SeenContentEntry[] = response.data.results
        const _carousel: CarouselEntry[] = []

        response.data.results.forEach((contentData: any) => {
            _carousel.push({
                itemData: contentData,
                tmdbResource: contentData.poster,
            })
        })
        setSeenContent(_carousel)
    }

    const onFailure = (error: any) => {
        console.log(error)
    }

    useEffect(() => {
        getWatchlist(onSuccessGetWatchlist)

        const profileParams: getProfileParams = {
            userId: userId? userId : 0,
        }
        getProfile(profileParams, onSuccessGetProfile)
        getUserServices(onSuccessGetUserServices)

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
            {loadingParams ? 
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
