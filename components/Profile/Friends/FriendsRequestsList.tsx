import React from 'react'
import { ScrollView, View } from 'react-native'
import { FriendRequestType } from './FriendRequestButton'
import { FriendRequestEntry } from './FriendRequestEntry'
import { BodyText } from '../../BasicComponents/BodyText'
import { colors } from '../../../assets'

type FriendsListParams = {
  friendsRequests: FriendRequestType[]
}

export const FriendsRequestsList = (params: FriendsListParams) => {
  return (
    params.friendsRequests.length > 0?
    <ScrollView style={{margin: 10, width: '100%'}} >
      {params.friendsRequests.map((request, index) => (
        <View key={index}>
          <FriendRequestEntry {...request} />  
        </View>
      )
      )}
    </ScrollView> :
    <BodyText 
      body='No hay solicitudes de amistad pendientes' 
      size='big'
      color={colors.primaryBlue} />
  )
}