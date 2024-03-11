import React from 'react'
import { View, StyleSheet, Image } from 'react-native';
import { TitleText } from '../BasicComponents/TitleText';
import { BodyText } from '../BasicComponents/BodyText';
import { ProfilePicture } from '../Profile/ProfilePicture';
import { LocalIcon } from '../Types/LocalIcon';

export const SeenContentEntryFooter = () => {
    return(
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
                source={LocalIcon.popcorn}
                style={{
                    width: 30,
                    aspectRatio: 1240 / 1598,
                    marginLeft: 11,
                }} />
            <View style={{ flexGrow: 1 }}></View>
            <Image
                source={LocalIcon.review}
                style={{
                    width: 30,
                    aspectRatio: 555 / 513,
                    marginRight: 11,
                }} />
        </View>
    )
}
