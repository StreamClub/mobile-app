import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../assets'
import { Stack } from 'expo-router'
import { LoadingComponent } from '../../components/BasicComponents/LoadingComponent'
import { FriendsList } from '../../components/Profile/Friends/FriendsList'
import { useGetFriends } from '../../hooks/friends/useGetFriendsList'
import { useOnFocus } from '../../hooks/useOnFocus'
import { FriendType } from '../../components/Profile/Friends/FriendEntry'
import { CreateGroupScreen } from '../../components/CreateGroup/CreateGroupScreen'

export default function CreateGroup() {

  return(
    <View style={styles.container}>
      <Stack.Screen
        options ={{headerTitle: "Nuevo Grupo"}}
      />
        <CreateGroupScreen />
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
