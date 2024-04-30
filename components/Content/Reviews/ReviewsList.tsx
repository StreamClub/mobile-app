import React from 'react'
import { View } from 'react-native'
import { MyReview } from './MyReview'
import { ContentReviews } from './ContentReviews'
import { Review } from '../../../entities/Review'

export type ReviewsListEntry = {
  contentType: 'movie' | 'series',
  contentId: string,
  userReview: Review | null
}

export const ReviewsList = (params: ReviewsListEntry) => {
  return(
    <View>
      <MyReview contentId={params.contentId} contentType={params.contentType} userReview={params.userReview}/>
      <ContentReviews contentId={params.contentId} contentType={params.contentType} />
    </View>
  )
}