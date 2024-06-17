import React, { useState } from 'react'
import { Icon } from "react-native-paper"
import { Overlay } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Pressable, View } from 'react-native';
import { useSession } from '../../context/ctx';
import { colors } from '../../assets';
import { BodyText } from '../BasicComponents/BodyText';
import { ConfirmationOverlay } from '../BasicComponents/ConfirmationOverlay';

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
      <Pressable onPress={() => setOpenModal(true)} >
        <View style={{flexDirection: 'row', margin: 10}} >
          <BodyText 
            body='Cerrar sesión'  
            size='big'
            style={{marginRight: 10}}
            color={colors.primaryGrey} />
          <View style={{alignContent: 'flex-end'}}>
            <Icon 
              source="logout"
              color={colors.primaryGrey}
              size={25} />
          </View>
        </View>
      </Pressable>
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
