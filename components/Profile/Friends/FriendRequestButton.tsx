import React, { useState } from 'react'
import { useFriendsRequests } from '../../../hooks/friends/useFriendsRequests'
import { colors } from '../../../assets'
import { CustomButton } from '../../BasicComponents/CustomButton'
import { ConfirmationOverlay } from '../../BasicComponents/ConfirmationOverlay'
import { Overlay } from 'react-native-elements'

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
  const [areFriends, setAreFriends] = useState<boolean>(params.friendship != null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<string>(params.friendRequest?.id? params.friendRequest.id.toString() : '');
  const {sendFriendRequest, removeFriendRequest, removeFriend, loading} = useFriendsRequests(params.userId, setHasFriendRequest, setAreFriends, setRequestId);
  
  return(
    <>
    {areFriends?
      <CustomButton 
        buttonText='Amigo' 
        fontSize={'small'} 
        buttonSize='medium'
        style={{backgroundColor: colors.primaryBlue, margin: 5}}
        onPress={() => setOpenModal(true)} 
        loading={loading}
        type={'primary'}  /> :
      <CustomButton 
        buttonText={hasFriendRequest? 'Pendiente...' : 'Enviar solicitud'} 
        fontSize={'small'} 
        buttonSize='medium'
        style={{backgroundColor: colors.primaryGrey, margin: 5}}
        onPress={() => hasFriendRequest? removeFriendRequest(requestId) : sendFriendRequest()} 
        loading={loading}
        type={'primary'}  />
    }
    <Overlay
      isVisible={openModal}
      onBackdropPress={() => setOpenModal(false)}
      overlayStyle={{
        backgroundColor: colors.primarySkyBlue,
        margin: 20,
        borderRadius: 20,
      }}
    >
      <ConfirmationOverlay 
        onConfirmPress={() => removeFriend(params.userId)} 
        onCancelPress={() => setOpenModal(false)}
        loading={loading} 
        onSuccess={() => setOpenModal(false)}
        text='¿Estás seguro de que quieres eliminar esta amistad?' />  
    </Overlay>
    </>
  )
}