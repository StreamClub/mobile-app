import React from 'react'
import { CustomButton } from '../BasicComponents/CustomButton'

export const DiscoverButton = () => {
  return(
    <CustomButton 
      buttonText='Descubrir'
      fontSize='medium'
      type='primary'
      onPress={() => console.log("Descubrir")} />
  )
}