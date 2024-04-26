import React, { useState } from 'react'
import { View } from 'react-native'
import { MyReview } from './MyReview'
import { CustomButton } from '../../BasicComponents/CustomButton'
import { ReviewCard } from './ReviewCard'
import { colors } from '../../../assets'
import { TitleText } from '../../BasicComponents/TitleText'

export const ContentReviews = () => {
  const [showReviews, setShowReviews] = useState(false)
  const reviews = [
    {
      "id": "1",
      "userId": 101,
      "contentId": 1,
      "contentType": "movie",
      "liked": true,
      "review": "A mesmerizing journey into the depths of human emotions and the cosmos. Absolutely stunning!"
    },
    {
      "id": "2",
      "userId": 102,
      "contentId": 1,
      "contentType": "movie",
      "liked": true,
      "review": "Incredible cinematography and a gripping storyline make this a must-watch!"
    },
    {
      "id": "3",
      "userId": 103,
      "contentId": 1,
      "contentType": "movie",
      "liked": false,
      "review": "Disappointing sequel that fails to capture the magic of the original film."
    },
    {
      "id": "4",
      "userId": 104,
      "contentId": 1,
      "contentType": "movie",
      "liked": true,
      "review": "Avatar 2 surpasses all expectations with its groundbreaking visuals and compelling narrative."
    },
    {
      "id": "5",
      "userId": 105,
      "contentId": 1,
      "contentType": "movie",
      "liked": false,
      "review": "An overhyped and underwhelming experience. The plot feels recycled and lacks depth."
    }
  ]

  return(
    <View>
      {showReviews?
        <View style={{backgroundColor: colors.secondarySkyBlue, margin: 5, borderRadius: 10}}>
          <TitleText body='Other reviews:' size='small' style={{marginLeft: 10}} />
          {reviews.map((review, index) => (
            <ReviewCard review={review} key={index}/>
          ))}
          <CustomButton 
            buttonText='Hide reviews' 
            type='primary'
            onPress={() => setShowReviews(false)}
            fontSize='medium' 
            style={{margin: 20}}/>
        </View> :
        <CustomButton 
          buttonText='See all reviews' 
          type='primary'
          onPress={() => setShowReviews(true)}
          fontSize='medium' 
          style={{margin: 20}}/>
      }
    </View>
  )
}