import React, { useState } from 'react'
import { ReviewCard } from "./ReviewCard"
import { View } from 'react-native'
import { TitleText } from '../../BasicComponents/TitleText'
import { colors } from '../../../assets'
import { CustomButton } from '../../BasicComponents/CustomButton'
import { UpdateReviewOverlay } from './UpdateReviewOverlay'
import { Overlay } from 'react-native-elements'

export const MyReview = () => {
  const [openModal, setOpenModal] = useState(false)
  const userReview = null/* {
    "id": "1",
    "userId": 101,
    "contentId": 1,
    "contentType": "movie",
    "liked": true,
    "review": "A mesmerizing journey into the depths of human emotions and the cosmos. Absolutely stunning!"
  } */;
  return(
    <>
    {userReview?
      <View style={{margin: 5, backgroundColor: colors.secondarySkyBlue, borderRadius: 10}}>
        <TitleText body='Tu review:' size='small' style={{marginLeft: 10}} />
        <ReviewCard review={userReview}/>
      </View> :
      <CustomButton 
        buttonText='Agregar una review' 
        type='primary'
        onPress={() =>  setOpenModal(true)}
        fontSize='medium' 
        style={{margin: 20}}/>
    }
    <Overlay
      isVisible={openModal}
      onBackdropPress={() => setOpenModal(false)}
      overlayStyle={{
        backgroundColor: colors.primarySkyBlue,
        margin: 20,
        borderRadius: 20,
      }}
    >
      <UpdateReviewOverlay />
    </Overlay>
    </>
  )
}