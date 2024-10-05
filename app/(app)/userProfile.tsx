import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { colors } from '../../assets'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { ProfileScreen, ProfileScreenParams } from '../../components/Profile/ProfileScreen'
import { ProfileHeaderParams } from '../../components/Profile/ProfileHeader'
import { Stack, useLocalSearchParams } from 'expo-router'
import { CarouselEntry } from '../../components/BasicComponents/Types/CarouselParams'
import { useOnFocus } from '../../hooks/useOnFocus'
import { useProfile } from '../../hooks/useProfile'
import { WatchlistEntry } from '../../components/Types/Watchlist'

const emptyProfile = {
  editable: true,
  id: 0,
  email: '',
  userName: '',
  displayName: '',
  friendsCount: 0,
  reviewsCount: 0,
  level: {
      name: 'Loading...',
      points: 0,
      nextLevelThreshold: 1
  },
  friendRequest: null,
  friendship: null,
  photoId: 0
}

export type UserProfileParams = {
  userId: string
}

export default function UserProfile() {
  const params = useLocalSearchParams<UserProfileParams>()
  const userId = +params.userId;
  const [watchlist, setWatchlist] = useState<WatchlistEntry[]>([]);
  const [userServices, setUserServices] = useState<CarouselEntry[]>([]);
  const [seenContent, setSeenContent] = useState<CarouselEntry[]>([]);
  const [profileHeader, setProfileHeader] = useState<ProfileHeaderParams>(emptyProfile);
  const {loadingParams, getAll, onWatchlistReachedEnd} = useProfile(setWatchlist, setUserServices, setSeenContent, setProfileHeader, userId);

  useOnFocus(() => {
    getAll()
  })

  const profileParams: ProfileScreenParams = {
    editable: false,
    watchlist: watchlist,
    profileHeader: profileHeader,
    userServices: userServices,
    seenContent: seenContent,
    getAll: getAll,
    onWatchlistReachedEnd: onWatchlistReachedEnd,
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options ={{}}
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