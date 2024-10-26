import React from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import { FriendEntry, FriendType } from './FriendEntry'
import { BodyText } from '../../BasicComponents/BodyText'
import { colors } from '../../../assets'

type FriendsListParams = {
  friends: FriendType[]
  onReachedEnd: () => void
}

export const FriendsList = (params: FriendsListParams) => {
  
  return (
    params.friends.length > 0 ?
    
    <FlatList 
      style={{margin: 10, width: '100%'}}
      data={params.friends}
      renderItem={({item, index}) => <FriendEntry {...item} />}
      keyExtractor={(item, index) => index.toString()}
      onEndReachedThreshold={0.5}
      onEndReached={params.onReachedEnd}
    />
     :
    <BodyText 
      body='Todavía no tienes amigos' 
      size='big'
      color={colors.primaryBlue} />
  )
}