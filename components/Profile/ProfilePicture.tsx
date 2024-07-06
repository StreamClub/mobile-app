import React, { useState } from 'react'
import { Image, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { LocalIcon } from '../Types/LocalIcon';
import { Overlay } from 'react-native-elements';
import { EditProfileImageOverlay } from './EditProfileImageOverlay';
import { colors } from '../../assets';

const getPictureUri = (firebaseId: number) => {
    // TODO: implement firebase
    return "https://www.shutterstock.com/image-photo/boring-job-bengal-cat-business-600nw-1999601336.jpg"
}

export type ProfilePictureParams = {
    style: object,
    editable?: boolean
}

export const ProfilePicture = (params: ProfilePictureParams) => {
    const uri = getPictureUri(1);
    const [openModal, setOpenModal] = useState(false);

    return(
        <View style={{flexDirection: 'row'}} >
            <Image 
                source={{uri: uri}} 
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
