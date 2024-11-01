import React, { useState } from 'react'
import { Image, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { LocalIcon } from '../Types/LocalIcon';
import { Overlay } from 'react-native-elements';
import { EditProfileImageOverlay } from './EditProfileImageOverlay';
import { colors } from '../../assets';
import { imagesMap } from './imagesMap';

export type ProfilePictureParams = {
    photoId: number,
    style: object,
    editable?: boolean
}

export const ProfilePicture = (params: ProfilePictureParams) => {
    const [openModal, setOpenModal] = useState(false);
    const [photoId, setPhotoId] = useState(params.photoId);

    return(
        <View style={{flexDirection: 'row'}} >
            {photoId?
                <Image 
                    source={imagesMap[photoId]}  
                    style={params.style}
                /> : null
            }
            {params.editable? 
                <IconButton
                    icon={LocalIcon.edit}
                    size={20}
                    onPress={() =>setOpenModal(true)}
                    style={{justifyContent: 'flex-end', alignSelf: 'flex-end'}} /> :
                null
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
                <EditProfileImageOverlay 
                    setPhotoId={setPhotoId}
                    setOpenModal={setOpenModal} />
            </Overlay>
        </View>
    )
}
