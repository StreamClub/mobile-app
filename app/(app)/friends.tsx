import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../assets'
import { Stack } from 'expo-router'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { FriendsList } from '../../components/Profile/Friends/FriendsList'
import { useGetFriends } from '../../hooks/friends/useGetFriendsList'
import { useOnFocus } from '../../hooks/useOnFocus'
import { FriendType } from '../../components/Profile/Friends/FriendEntry'

export default function Friends() {
  const [friends, setFriends] = useState<FriendType[]>([]);
  const {getFriends, loading} = useGetFriends(setFriends);

  useOnFocus(() => {
    getFriends();
  })

  return(
    <View style={styles.container}>
      <Stack.Screen
        options ={{}}
      />
      {loading ? 
        <LoadingComponent />
      :
        <FriendsList friends={friends}/>
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
