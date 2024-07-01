import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TitleText } from '../BasicComponents/TitleText';
import { colors } from '../../assets';
import { useGetProfilePhotos } from '../../apiCalls/profile';
import { LoadingComponent } from '../BasicComponents/LoadingComponent';
import { useOnFocus } from '../../hooks/useOnFocus';

const imagesMap: { [key: number]: any } = {
  11: require("../../assets/profileImages/11.png"),
  12: require("../../assets/profileImages/12.png"),
  13: require("../../assets/profileImages/13.png"),
  21: require("../../assets/profileImages/21.png"),
  22: require("../../assets/profileImages/22.png"),
  23: require("../../assets/profileImages/23.png"),
  31: require("../../assets/profileImages/31.png"),
  32: require("../../assets/profileImages/32.png"),
  33: require("../../assets/profileImages/33.png"),
  41: require("../../assets/profileImages/41.png"),
  42: require("../../assets/profileImages/42.png"),
  43: require("../../assets/profileImages/43.png")
};

type ProfilePhoto = {
  id: number,
  available: boolean
}

export const EditProfileImageOverlay = () => {
  const {getProfilePhotos, loading} = useGetProfilePhotos();
  const [profilePhotos, setProfilePhotos] = useState<Array<ProfilePhoto>>([]);

  const onSuccess = (response: any) => {
    const input = response.data;
    const photos = Object.keys(input).filter(key => !isNaN(Number(key))).map(key => input[key]);
    setProfilePhotos(photos);
  }

  useOnFocus(() => {
    getProfilePhotos(onSuccess);
  })

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
              <Image 
                source={imagesMap[image.id]} 
                style={[styles.image, !image.available && {opacity: 0.5}]} />
            </View>
          ))}
        {/* Agregar un textito que diga que se desbloquean nuevas imagenes al subir de nivel (puedo averiguar una i de info) */}
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
