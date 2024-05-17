import React, { useState } from 'react'
import { IconButton } from "react-native-paper"
import { colors } from "../assets"
import { useSession } from '../context/ctx';
import { Overlay } from 'react-native-elements';
import { ConfirmationOverlay } from './BasicComponents/ConfirmationOverlay';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const LogOutButton = () => {
  const session = useSession();
  const signOut = session?.signOut;
  const [openModal, setOpenModal] = useState(false);

  const onConfirmSignOut = () => {
    signOut?.();
    const user = auth().currentUser;
    if (user) {
      auth().signOut().then(() => {
        GoogleSignin.revokeAccess();
      });
    }
  }

  return (
    <>
      <IconButton 
        icon="logout"
        iconColor={colors.primaryGrey}
        size={30}
        onPress={() => setOpenModal(true)}
        style={{marginRight: 20}} />
      <Overlay
        isVisible={openModal}
        onBackdropPress={() => setOpenModal(false)}
        overlayStyle={{
          backgroundColor: colors.primarySkyBlue,
          margin: 20,
          borderRadius: 20,
        }} >
        <ConfirmationOverlay 
          onConfirmPress={() => onConfirmSignOut()} 
          onCancelPress={() => setOpenModal(false)}
          loading={false} 
          onSuccess={() => {}}
          text='¿Estás seguro de que quieres cerrar sesión?' />
      </Overlay>
    </>
  )
}
