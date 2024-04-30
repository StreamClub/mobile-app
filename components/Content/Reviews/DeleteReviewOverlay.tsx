import { AxiosResponse } from 'axios'
import React, { useState } from 'react'
import { View } from 'react-native'
import { styles } from './styles/Review.styles'
import { CustomButton } from '../../BasicComponents/CustomButton'
import { BodyText } from '../../BasicComponents/BodyText'

export type DeleteReviewEntry = {
  onConfirmPress: (onSuccess: (response: AxiosResponse<any, any>) => void) => void,
  onCancelPress: () => void,
  loading: boolean,
  onSuccess: (response: AxiosResponse<any, any>) => void
}

export const DeleteReviewOverlay = (params: DeleteReviewEntry) => {
  return(
    <View style={styles.container}>
      <BodyText body='¿Estás seguro que deseas eliminar tu review?' size='big' />
      <View style={{flexDirection: 'row', justifyContent: 'center', margin: 5}}>
        <CustomButton 
          buttonText='Eliminar'
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