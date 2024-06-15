import React from 'react'
import { IconButton } from "react-native-paper"
import { colors } from '../../../assets'
import { router } from 'expo-router'

export const RequestsListButton = () => {
  return (
    <>
      <IconButton 
        icon="account-plus"
        iconColor={colors.primaryGrey}
        size={30}
        onPress={() => router.push('/friendsRequests')}
        style={{marginRight: 20}} />
    </>
  )
}
