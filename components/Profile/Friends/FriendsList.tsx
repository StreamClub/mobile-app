import React from 'react'
import { ScrollView, View } from 'react-native'
import { FriendEntry, FriendType } from './FriendEntry'

type FriendsListParams = {
  friends: FriendType[]
}

export const FriendsList = (params: FriendsListParams) => {
  return (
    <ScrollView style={{margin: 10, width: '100%'}} >
      {params.friends.map((friend, index) => (
        <View key={index}>
          <FriendEntry {...friend} />
          <View
            style={{
                height: 1,
                backgroundColor: 'black',
                width: '90%',
                marginBottom: 10,
                alignSelf: 'center',
            }}
          ></View>  
        </View>
      )
      )}
    </ScrollView>
  )
}