import React from 'react'
import { View } from 'react-native'
import { Card, Avatar, Icon } from 'react-native-paper';
import { BodyText } from '../../BasicComponents/BodyText'
import { colors } from '../../../assets';

export const ReviewCard = () => {
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
                <BodyText body='Dieguito' style={{margin: 10, fontWeight: 'bold'}} size='big'/>
              </View>
              <Icon source="thumb-up" color={colors.secondaryBlue} size={40} />
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: colors.primaryBlack, marginTop: 10, marginBottom: 10}} />
            <View>
              <BodyText body='Avatar 2 nos lleva de vuelta a Pandora con una espectacularidad visual que supera a su predecesora. ¡Una obra maestra!' />
            </View>
          </Card.Content>
          <Card.Actions>
            <View style={{marginRight: 10}}>
              
            </View>
          </Card.Actions>
        </Card>
      </View>
    )
}
