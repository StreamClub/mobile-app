import React from 'react'
import { View } from 'react-native'
import { Card, Avatar, Icon } from 'react-native-paper';
import { BodyText } from '../../BasicComponents/BodyText'
import { colors } from '../../../assets';

export type ReviewType = {
  id: string,
  userId: number,
  contentId: number,
  contentType: string,
  liked: boolean,
  review: string
}

type ReviewEntry = {
  review: ReviewType
}

export const ReviewCard = (params: ReviewEntry) => {
  const review = params.review;
  return (
    <View style={{margin: 10}}>
      <Card style={{backgroundColor: colors.primaryWhite, borderWidth: 10, borderColor: colors.secondaryBlue}}>
        <Card.Content>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar.Image 
                size={50} 
                style={{margin: 5}}
                source={{uri: 'https://www.shutterstock.com/image-photo/boring-job-bengal-cat-business-600nw-1999601336.jpg'}} />
              <BodyText body={"User " + review.userId} style={{margin: 10, fontWeight: 'bold'}} size='big'/>
            </View>
            {review.liked?
              <Icon source="thumb-up" color={colors.secondaryBlue} size={40} /> :
              <Icon source="thumb-down" color={colors.secondaryRed} size={40} />
            }
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: colors.primaryBlack, marginTop: 10, marginBottom: 10}} />
          <View>
            <BodyText body={review.review} />
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}