import React from 'react'
import { CustomButton } from '../BasicComponents/CustomButton'
import { router } from 'expo-router'

export const DiscoverButton = () => {
  const onPress = () => {
    router.push('/discover');
  }

  return(
    <CustomButton 
      buttonText='Descubrir'
      fontSize='medium'
      type='primary'
      onPress={onPress} />
  )
}