import React, { useState } from 'react'
import { useFriendsRequests } from '../../../hooks/friends/useFriendsRequests'
import { colors } from '../../../assets'
import { CustomButton } from '../../BasicComponents/CustomButton'

export type FriendRequestType = {
  id: number,
  displayName: string,
  email: string,
  userId: number,
  userName: string
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
  const [hasFriendRequest, setHasFriendRequest] = useState<boolean>(params.friendRequest != null);
  const {sendFriendRequest, loading} = useFriendsRequests(params.userId, setHasFriendRequest)

  return(
    params.friendship?
      <CustomButton 
        buttonText='Amigo' 
        fontSize={'small'} 
        buttonSize='medium'
        style={{backgroundColor: colors.primaryBlue, margin: 5}}
        onPress={sendFriendRequest} 
        loading={loading}
        type={'primary'}  /> :
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