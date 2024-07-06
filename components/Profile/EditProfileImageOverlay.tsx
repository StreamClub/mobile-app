import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { TitleText } from '../BasicComponents/TitleText';
import { colors } from '../../assets';
import { useGetProfilePhotos, usePatchProfile } from '../../apiCalls/profile';
import { LoadingComponent } from '../BasicComponents/LoadingComponent';
import { useOnFocus } from '../../hooks/useOnFocus';
import { BodyText } from '../BasicComponents/BodyText';
import { imagesMap } from './imagesMap';

type ProfilePhoto = {
  id: number,
  available: boolean
}

type EditProfileImageOverlayParams = {
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

export const EditProfileImageOverlay = (params: EditProfileImageOverlayParams) => {
  const {getProfilePhotos, loading} = useGetProfilePhotos();
  const [profilePhotos, setProfilePhotos] = useState<Array<ProfilePhoto>>([]);
  const {patchProfile} = usePatchProfile();

  const onSuccess = (response: any) => {
    const input = response.data;
    const photos = Object.keys(input).filter(key => !isNaN(Number(key))).map(key => input[key]);
    setProfilePhotos(photos);
  }

  useOnFocus(() => {
    getProfilePhotos(onSuccess);
  })

  const onSuccessUpdatePhoto = (response: any) => {
    console.log(response.data);
    params.setOpenModal(false);
  }

  const onImagePress = (image: ProfilePhoto) => {
    if(image.available) {
      console.log(image.id);
      patchProfile({photoId: image.id}, onSuccessUpdatePhoto);
    } else {
      console.log("Image not available");
    }
  }

  return (
    <View style={styles.container}>
        {!loading?
        <>
        <TitleText 
          body="Elegir foto de perfil:"
          color={colors.primaryWhite} />
        <View style={styles.grid}>
          {profilePhotos.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Pressable onPress={() => onImagePress(image)}>
                <Image 
                  source={imagesMap[image.id]} 
                  style={[styles.image, !image.available && {opacity: 0.5}]} />
              </Pressable>
            </View>
          ))}
        <BodyText body ="* ¡Desbloquea nuevas imágenes al subir de nivel!" />
        </View>
        </> :
        <LoadingComponent /> }
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: 'center'
  },
  grid: {
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  imageContainer: {
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    margin: 5
  },
});
