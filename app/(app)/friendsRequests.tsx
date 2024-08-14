import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../assets'
import { Stack } from 'expo-router'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { useGetFriendsRequests } from '../../hooks/friends/useGetFriendsList'
import { useOnFocus } from '../../hooks/useOnFocus'
import { FriendRequestType } from '../../components/Profile/Friends/FriendRequestButton'
import { FriendsRequestsList } from '../../components/Profile/Friends/FriendsRequestsList'

export default function Friends() {
  const [friendsRequests, setFriendsRequests] = useState<FriendRequestType[]>([]);
  const {getFriendRequest, onFriendsRequestsReachedEnd, loading} = useGetFriendsRequests(setFriendsRequests);
  const [ loadingFirstPage, setLoadingFirstPage ] = useState(true);

  useOnFocus(() => {
    getFriendRequest();
  })
  useEffect(() => {
    if (loadingFirstPage && !loading) {
      console.log('[loadingFirstPage]', loadingFirstPage)
      setLoadingFirstPage(false);
    }
  }, [loading])

  return(
    <View style={styles.container}>
      <Stack.Screen
        options ={{}}
      />
      {loadingFirstPage ? 
        <LoadingComponent />
        :
        <FriendsRequestsList friendsRequests={friendsRequests} onReachedEnd={onFriendsRequestsReachedEnd}/>   
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
  }
})
