import React from 'react'
import { View } from 'react-native'
import { MyReview } from './MyReview'
import { ContentReviews } from './ContentReviews'

export type ReviewsListEntry = {
  contentType: 'movie' | 'series',
  contentId: string
}

export const ReviewsList = (params: ReviewsListEntry) => {
  return(
    <View>
      <MyReview />
      <ContentReviews contentId={params.contentId} contentType={params.contentType} />
    </View>
  )
}