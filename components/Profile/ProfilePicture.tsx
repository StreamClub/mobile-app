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

    return(
        <View style={{flexDirection: 'row'}} >
            <Image 
                source={imagesMap[params.photoId]}  
                style={params.style}
            />
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
                <EditProfileImageOverlay setOpenModal={setOpenModal} />
            </Overlay>
        </View>
    )
}
