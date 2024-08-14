import React from 'react';
import * as FileSystem from 'expo-file-system';
import Share from 'react-native-share';
import config from '../../config.json';
import { colors } from '../../assets';
import { IconButton } from 'react-native-paper';

export type ShareContentButtonProps = {
  poster: string,
  title: string
}

export const ShareContentButton = (params: ShareContentButtonProps) => {
  const imageUrl = config.tmdbBaseUrl + params.poster;
  
  const onShare = async () => {
    const localUri = `${FileSystem.documentDirectory}shared-image.jpg`;
    await FileSystem.downloadAsync(imageUrl, localUri);
    const shareOptions = {
      title: 'Share via',
      message: `¡Desde STREAM CLUB te recomiendo ver "${params.title}"! ¡Disfrútala!`,
      url: localUri,
      type: 'image/jpg'
    };
    
    try {
      const result = await Share.open(shareOptions);
      if (result.success) {
        console.log('Shared successfully');
      } else {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IconButton 
      icon="share-variant"
      iconColor={colors.primaryBlack}
      size={35}
      onPress={onShare} />
  )
}