import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../assets'
import { Stack } from 'expo-router'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { FriendsList } from '../../components/Profile/FriendsList'
import { useGetFriendsRequests } from '../../hooks/useGetFriendsList'
import { useOnFocus } from '../../hooks/useOnFocus'
import { FriendRequestType } from '../../components/Profile/FriendRequestButton'

export default function Friends() {
  const [friendsRequests, setFriendsRequests] = useState<FriendRequestType[]>([]);
  const {getFriendRequest, loading} = useGetFriendsRequests(setFriendsRequests);

  useOnFocus(() => {
    getFriendRequest();
  })

  return(
    <View style={styles.container}>
      <Stack.Screen
        options ={{}}
      />
      {loading ? 
        <LoadingComponent />
      :
        <FriendsList friendsRequests={friendsRequests}/>   
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
