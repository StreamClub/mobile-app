import React from 'react'
import { ReviewCard } from "./ReviewCard"
import { View } from 'react-native'
import { TitleText } from '../../BasicComponents/TitleText'
import { colors } from '../../../assets'

export const MyReview = () => {
  const review = {
    "id": "1",
    "userId": 101,
    "contentId": 1,
    "contentType": "movie",
    "liked": true,
    "review": "A mesmerizing journey into the depths of human emotions and the cosmos. Absolutely stunning!"
  };
  return(
    <View style={{margin: 5, backgroundColor: colors.secondarySkyBlue, borderRadius: 10}}>
      <TitleText body='Your review:' size='small' style={{marginLeft: 10}} />
      <ReviewCard review={review}/>
    </View>
  )
}