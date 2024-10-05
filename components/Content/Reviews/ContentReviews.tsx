import React, { useState } from 'react'
import { View } from 'react-native'
import { CustomButton } from '../../BasicComponents/CustomButton'
import { ReviewCard } from './ReviewCard'
import { colors } from '../../../assets'
import { TitleText } from '../../BasicComponents/TitleText'
import { useReviewsList } from '../../../hooks/reviews/useReviews'

export type ContentReviewsEntry = {
  contentType: 'movie' | 'series',
  contentId: string
}

export const ContentReviews = (params: ContentReviewsEntry) => {
  const [showReviews, setShowReviews] = useState(false);
  const {onSeeAllPress, reviews, setReviews, loading} = useReviewsList(params.contentId, params.contentType);

  const onSuccess = (response: any) => {
    console.log('responseMovie ' + response.data.page);
    setReviews(response.data.results);
  }

  return(
    <View>
      {showReviews && reviews ?
        <View style={{backgroundColor: colors.secondarySkyBlue, margin: 5, borderRadius: 10}}>
          <TitleText body='Reseñas:' size='small' style={{marginLeft: 10}} />
          {reviews.map((review, index) => (
            <ReviewCard review={review} key={index}/>
          ))}
          <CustomButton 
            buttonText='Ocultar reseñas' 
            type='primary'
            onPress={() => setShowReviews(false)}
            fontSize='medium' 
            style={{margin: 20}}/>
        </View> :
        <CustomButton 
          buttonText='Ver todas las reseñas' 
          type='primary'
          onPress={() => {
            setShowReviews(true);
            onSeeAllPress(onSuccess);
          }}
          fontSize='medium' 
          style={{margin: 20}}
          loading={loading}/>
      }
    </View>
  )
}