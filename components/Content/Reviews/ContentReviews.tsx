import React, { useState } from 'react'
import { View } from 'react-native'
import { CustomButton } from '../../BasicComponents/CustomButton'
import { ReviewCard } from './ReviewCard'
import { colors } from '../../../assets'
import { TitleText } from '../../BasicComponents/TitleText'
import { useReviewsList } from '../../../hooks/reviews/useReviews'
import { useSession } from '../../../context/ctx'
import { BodyText } from '../../BasicComponents/BodyText'

export type ContentReviewsEntry = {
  contentType: 'movie' | 'series',
  contentId: string
}

export const ContentReviews = (params: ContentReviewsEntry) => {
  const [showReviews, setShowReviews] = useState(false);
  const {onSeeAllPress, reviews, setReviews, loading} = useReviewsList(params.contentId, params.contentType);
  const session = useSession();
  const userId = session?.userId ? session.userId : 0;

  const onSuccess = (response: any) => {
    console.log('responseMovie ' + response.data.page);
    setReviews(response.data.results);
  }

  const otherReviews = reviews? reviews.filter(item => item.userId != userId) : []; 

  return(
    <View>
      {showReviews && reviews ?
        <View style={{backgroundColor: colors.secondarySkyBlue, margin: 5, borderRadius: 10}}>
          <TitleText body='Reseñas:' size='small' style={{marginLeft: 10}} />
          {otherReviews.length > 0? 
            otherReviews.map((review, index) => (
              <ReviewCard review={review} key={index}/>
            )) :
            <BodyText
              style={{margin: 5, alignSelf: 'center'}}
              body='Lamentablemente todavía no hay reseñas.'
              color={colors.primaryRed} />
          }
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