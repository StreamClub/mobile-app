import React from 'react'
import { View } from 'react-native'
import { Card, Avatar, Icon, IconButton } from 'react-native-paper';
import { BodyText } from '../../BasicComponents/BodyText'
import { colors } from '../../../assets';
import { ProfilePicture } from '../../Profile/ProfilePicture';
import { styles } from './styles/Review.styles';

export type ReviewType = {
  id: string,
  userId: number,
  contentId: number,
  contentType: string,
  liked: boolean,
  review: string,
  photoId: number,
  userName?: string
}

type ReviewEntry = {
  review: ReviewType,
  editable?: boolean,
  onEditPress?: (...params: any[]) => void,
  onDeletePress?: (...params: any[]) => void
}

export const ReviewCard = (params: ReviewEntry) => {
  const review = params.review;
  const editable = params.editable? params.editable : false;
  return (
    <View style={{margin: 10}}>
      <Card style={{backgroundColor: colors.primaryWhite, borderWidth: 10, borderColor: colors.secondaryBlue}}>
        <Card.Content>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ProfilePicture photoId={review.photoId} style={styles.picture} editable={false} />
              <BodyText 
                body={review.userName? review.userName : "Mi reseña"} 
                style={{margin: 10, fontWeight: 'bold'}} 
                size='big'/>
            </View>
            {review.liked?
              <Icon source="thumb-up" color={colors.secondaryBlue} size={40} /> :
              <Icon source="thumb-down" color={colors.secondaryRed} size={40} />
            }
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: colors.primaryBlack, marginTop: 10, marginBottom: 10}} />
          <View>
            <BodyText body={review.review} style={{marginBottom: 10}} />
          </View>
        </Card.Content>
        {editable?
          <Card.Actions style={null}>
            <IconButton
              icon="trash-can-outline"
              iconColor={colors.secondaryRed}
              size={30}
              onPress={params.onDeletePress} 
              style={{borderColor: colors.primaryWhite}} />
            <IconButton
              icon="pencil-outline"
              iconColor={colors.secondaryBlue}
              size={30}
              onPress={params.onEditPress}
              style={{backgroundColor: colors.primaryWhite}} />
          </Card.Actions>
          : null
        }
      </Card>
    </View>
  )
}
