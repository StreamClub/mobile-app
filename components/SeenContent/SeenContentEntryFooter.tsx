import React from 'react'
import { View, StyleSheet, Image } from 'react-native';
import { TitleText } from '../BasicComponents/TitleText';
import { BodyText } from '../BasicComponents/BodyText';
import { ProfilePicture } from '../Profile/ProfilePicture';
import { LocalIcon } from '../Types/LocalIcon';

type SeenContentEntryFooterParams = {
    size: number;
}

export const SeenContentEntryFooter = (params: SeenContentEntryFooterParams) => {
    const size = params.size
    
    return(
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={LocalIcon.popcorn}
                style={{
                    width: size,
                    aspectRatio: 1240 / 1598,
                    marginLeft: 11,
                }} />
            <View style={{ flexGrow: 1 }}></View>
            <Image
                source={LocalIcon.review}
                style={{
                    width: size,
                    aspectRatio: 555 / 513,
                    marginRight: 11,
                }} />
        </View>
    )
}
