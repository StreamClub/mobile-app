import React from 'react'
import { IconButton } from "react-native-paper"
import { router } from 'expo-router'
import { colors } from '../../assets'

export const SettingsButton = () => {
  return (
    <>
      <IconButton 
        icon="cog"
        iconColor={colors.primaryGrey}
        size={30}
        onPress={() => router.push('/settings')}
        style={{marginRight: 20}} />
    </>
  )
}
