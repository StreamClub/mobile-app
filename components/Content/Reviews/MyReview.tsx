import React, { useState } from 'react'
import { ReviewCard } from "./ReviewCard"
import { View } from 'react-native'
import { TitleText } from '../../BasicComponents/TitleText'
import { colors } from '../../../assets'
import { CustomButton } from '../../BasicComponents/CustomButton'
import { UpdateReviewOverlay } from './UpdateReviewOverlay'
import { Overlay } from 'react-native-elements'
import { useOnDeleteReviewPress, useOnUpdateReviewPress } from '../../../hooks/reviews/useReviews';
import { Review } from '../../../entities/Review'
import { ConfirmationOverlay } from '../../BasicComponents/ConfirmationOverlay'

export type MyReviewEntry = {
  contentType: 'movie' | 'series',
  contentId: string,
  userReview: Review | null
}

export const MyReview = (params: MyReviewEntry) => {
  const { onPress, loading } = useOnUpdateReviewPress(params.contentId, params.contentType);
  const {onPress: onDeletePress, loading: deleteLoading} = useOnDeleteReviewPress(params.contentId, params.contentType);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [userReview, setUserReview] = useState(params.userReview);

  const onSuccess = (response: any) => {
    setOpenModal(false);
    console.log(response.data);
    setUserReview(response.data);
  }

  const onDeleteSuccess = (response: any) => {
    setOpenDeleteModal(false);
    console.log(response.data);
    setUserReview(null);
  }

  return(
    <>
    {userReview?
      <View style={{margin: 5, backgroundColor: colors.secondarySkyBlue, borderRadius: 10}}>
        <TitleText body='Tu review:' size='small' style={{marginLeft: 10}} />
        <ReviewCard 
          review={userReview} 
          editable={true} 
          onEditPress={() => setOpenModal(true)} 
          onDeletePress={() => setOpenDeleteModal(true)} />
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
      <UpdateReviewOverlay 
        onPress={onPress} 
        loading={loading} 
        onSuccess={onSuccess}
        myReviewText={userReview?.review}
        myLike={userReview?.liked} />
    </Overlay>
    <Overlay
      isVisible={openDeleteModal}
      onBackdropPress={() => setOpenDeleteModal(false)}
      overlayStyle={{
        backgroundColor: colors.primarySkyBlue,
        margin: 20,
        borderRadius: 20,
      }}
    >
      <ConfirmationOverlay 
        onConfirmPress={onDeletePress} 
        onCancelPress={() => setOpenDeleteModal(false)}
        loading={deleteLoading} 
        onSuccess={onDeleteSuccess}
        text='¿Estás seguro de que quieres eliminar esta review?' />
    </Overlay>
    </>
  )
}