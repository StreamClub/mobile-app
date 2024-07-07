import React from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import { FriendRequestType } from './FriendRequestButton'
import { FriendRequestEntry } from './FriendRequestEntry'
import { BodyText } from '../../BasicComponents/BodyText'
import { colors } from '../../../assets'

type FriendsListParams = {
  friendsRequests: FriendRequestType[]
  onReachedEnd: () => void
}

export const FriendsRequestsList = (params: FriendsListParams) => {
  return (
    params.friendsRequests.length > 0?
    <FlatList 
      style={{margin: 10, width: '100%'}}
      data={params.friendsRequests}
      renderItem={({item, index}) => <FriendRequestEntry {...item} />}
      keyExtractor={(item, index) => index.toString()}
      onEndReachedThreshold={0.5}
      onEndReached={params.onReachedEnd}
    />

    :
    <BodyText 
      body='No hay solicitudes de amistad pendientes' 
      size='big'
      color={colors.primaryBlue} />
  )
}