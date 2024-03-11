import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSession } from '../../context/ctx'
import { useState, useEffect } from 'react'
import { colors } from '../../assets'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { WatchlistEntry } from '../../components/Types/Watchlist'
import { getWatchlist, getWatchlistParams, getProfile, getProfileParams } from '../../apiCalls/profile'
import { getUserServices, getUserServicesParams } from '../../apiCalls/services'
import { ProfileScreen, ProfileScreenParams } from '../../components/Profile/ProfileScreen'
import { ProfileHeaderParams } from '../../components/Profile/ProfileHeader'
import { Stack } from 'expo-router'
import { CarouselEntry } from '../../components/BasicComponents/Types/CarouselParams'
import { ServiceEntry } from '../../components/Types/Services'
import { getSeenContent, getSeenContentParams } from '../../apiCalls/content'
import { SeenContentListEntry } from '../../entities/SeenContent/SeenContentListEntry'
import { SeenSeriesListEntry } from '../../entities/SeenContent/SeenSeriesListEntry'
import { SeenContentEntry } from '../../components/Types/SeenContentEntry'
import { router } from 'expo-router'

export default function Profile() {
    const session = useSession()
    const userId = session?.userId

    

    const [loadingWatchlist, setLoadingWatchlist] = useState(true)
    const [loadingProfileHeader, setLoadingProfileHeader] = useState(true)
    const [loadingUserServices, setLoadingUserServices] = useState(true)
    const [loadingSeenContent, setLoadingSeenContent] = useState(true)

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
        setLoadingWatchlist(false)
    }

    const onSuccessGetProfile = (response: any) => {
        const profileHeader: ProfileHeaderParams = response.data
        setProfileHeader(profileHeader)
        setLoadingProfileHeader(false)
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
        setLoadingUserServices(false)
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
        setLoadingSeenContent(false)
    }

    const onFailure = (error: any) => {
        console.log(error)
    }

    useEffect(() => {
        const watchlistParams: getWatchlistParams = {
            userId: userId? userId : 0,
        }
        getWatchlist(session, watchlistParams, onSuccessGetWatchlist, onFailure)

        const profileParams: getProfileParams = {
            userId: userId? userId : 0,
        }
        getProfile(session, profileParams, onSuccessGetProfile, onFailure)

        const userServicesParams: getUserServicesParams = {
            userId: userId ? userId : 0,
        }
        getUserServices(session, userServicesParams, onSuccessGetUserServices, onFailure)

        const seenContentParams: getSeenContentParams = {
            userId: userId ? userId : 0,
            page: 1,
            pageSize: 10,
        }
        getSeenContent(session, seenContentParams, onSuccessGetSeenContent, onFailure)
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
