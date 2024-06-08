import React from 'react'
import { BodyText } from '../BasicComponents/BodyText'
import { View } from 'react-native'
import { FriendRequestType } from './FriendRequestButton'

type FriendsListParams = {
  friendsRequests: FriendRequestType[]
}

export const FriendsList = (params: FriendsListParams) => {
  return (
    <View>
      {params.friendsRequests.map((item, index) => (
        <BodyText body={item.id.toString()} key={index}/>
      ))}
    </View>
  )
}