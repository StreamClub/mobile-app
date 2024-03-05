import React from 'react'
import { Image } from 'react-native';

const getPictureUri = (firebaseId: number) => {
    // TODO: implement firebase
    return "https://www.shutterstock.com/image-photo/boring-job-bengal-cat-business-600nw-1999601336.jpg"
}

export type ProfilePictureParams = {
    style: object,
}

export const ProfilePicture = (params: ProfilePictureParams) => {
    const uri = getPictureUri(1)
    return(
        <Image 
            source={{uri: uri}} 
            style={params.style}
        />
    )
}
