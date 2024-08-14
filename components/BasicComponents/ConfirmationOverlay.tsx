import { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { View } from 'react-native'
import { styles } from '../Content/Reviews/styles/Review.styles'
import { CustomButton } from './CustomButton'
import { BodyText } from './BodyText'

export type ConfirmationOverlayEntry = {
  onConfirmPress: (onSuccess: (response: AxiosResponse<any, any>) => void) => void,
  onCancelPress: () => void,
  loading: boolean,
  onSuccess: (response: AxiosResponse<any, any>) => void,
  text: string
}

export const ConfirmationOverlay = (params: ConfirmationOverlayEntry) => {
  return(
    <View style={styles.container}>
      <BodyText body={params.text} size='big' />
      <View style={{flexDirection: 'row', justifyContent: 'center', margin: 5}}>
        <CustomButton 
          buttonText='Confirmar'
          fontSize='small'
          type='primary'
          onPress={() => params.onConfirmPress(params.onSuccess)}
          buttonSize='medium'
          style={{margin: 5, width: 120}}
          loading={params.loading} />
        <CustomButton 
          buttonText='Cancelar'
          fontSize='small'
          type='secondary'
          onPress={params.onCancelPress}
          buttonSize='medium'
          style={{margin: 5, width: 120}} />
      </View>
    </View>
  )
}