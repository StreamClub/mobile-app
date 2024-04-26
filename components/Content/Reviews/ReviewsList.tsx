import React from 'react'
import { View } from 'react-native'
import { MyReview } from './MyReview'
import { ContentReviews } from './ContentReviews'

export const ReviewsList = () => {
  return(
    <View>
      <MyReview />
      <ContentReviews />
    </View>
  )
}