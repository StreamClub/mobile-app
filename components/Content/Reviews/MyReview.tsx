import React, { useState } from 'react'
import { ReviewCard } from "./ReviewCard"
import { View } from 'react-native'
import { TitleText } from '../../BasicComponents/TitleText'
import { colors } from '../../../assets'
import { CustomButton } from '../../BasicComponents/CustomButton'
import { UpdateReviewOverlay } from './UpdateReviewOverlay'
import { Overlay } from 'react-native-elements'
import { ReviewsListEntry } from './ReviewsList'
import { useOnUpdateReviewPress } from '../../../hooks/reviews/useReviews';

export const MyReview = (params: ReviewsListEntry) => {
  const { onPress, loading } = useOnUpdateReviewPress(params.contentId, params.contentType)
  const [openModal, setOpenModal] = useState(false)
  const userReview = null;

  const onSuccess = (response: any) => {
    setOpenModal(false);
    //setReviews(response.data.results);
  }

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
      <UpdateReviewOverlay onPress={onPress} loading={loading} onSuccess={onSuccess} />
    </Overlay>
    </>
  )
}