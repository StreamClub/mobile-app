import React, { useState } from 'react'
import { CustomButton } from '../BasicComponents/CustomButton'
import { colors } from '../../assets'
import { useFriendsRequests } from '../../hooks/useFriendsRequests'

export type FriendRequestType = {
  id: number,
  receiverId: number,
  senderId: number
}

export type FriendshipType = {
  id: number
}

type FriendRequestButtonParams = {
  userId: string,
  friendRequest: FriendRequestType | null,
  friendship: FriendshipType | null
}

export const FriendRequestButton = (params: FriendRequestButtonParams) => {
  const [areFriends, setAreFriends] = useState<boolean>(params.friendship == null);
  const [hasFriendRequest, setHasFriendRequest] = useState<boolean>(params.friendRequest != null);
  const {sendFriendRequest, loading} = useFriendsRequests(params.userId, setHasFriendRequest)

  return(
    <CustomButton 
      buttonText={hasFriendRequest? 'Pendiente...' : 'Enviar solicitud'} 
      fontSize={'small'} 
      buttonSize='medium'
      style={{backgroundColor: colors.primaryGrey, margin: 5}}
      onPress={sendFriendRequest} 
      loading={loading}
      type={'primary'}  />
  )
}